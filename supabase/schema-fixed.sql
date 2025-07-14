-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- Create custom types
create type user_role as enum ('seeker', 'provider');
create type booking_status as enum ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
create type payment_method as enum ('cash', 'esewa', 'khalti', 'online');
create type payment_status as enum ('pending', 'paid', 'refunded');
create type notification_type as enum ('booking', 'message', 'payment', 'review', 'general');
create type rate_unit as enum ('hour', 'day', 'project', 'sq_ft');

-- Users table (extends Supabase auth.users)
create table users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    full_name text not null,
    phone text,
    role user_role not null,
    avatar_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    is_verified boolean default false,
    language_preference text default 'ne' check (language_preference in ('ne', 'en'))
);

-- Service categories table
create table service_categories (
    id uuid primary key default uuid_generate_v4(),
    name_en text not null,
    name_ne text not null,
    description_en text,
    description_ne text,
    icon text not null,
    color text not null,
    parent_id uuid references service_categories(id),
    is_active boolean default true,
    sort_order integer default 0,
    created_at timestamptz default now()
);

-- Service providers table
create table service_providers (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references users(id) on delete cascade,
    business_name text,
    bio text,
    experience_years integer default 0,
    province text not null,
    district text not null,
    municipality text not null,
    ward integer,
    street_address text,
    hourly_rate decimal(10,2),
    is_available boolean default true,
    verified_documents jsonb default '{}',
    rating_average decimal(3,2) default 0.00 check (rating_average >= 0 and rating_average <= 5),
    total_reviews integer default 0,
    total_jobs_completed integer default 0,
    response_rate decimal(5,2) default 0.00 check (response_rate >= 0 and response_rate <= 100),
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(user_id)
);

-- Provider services table
create table provider_services (
    id uuid primary key default uuid_generate_v4(),
    provider_id uuid not null references service_providers(id) on delete cascade,
    category_id uuid not null references service_categories(id),
    title_en text not null,
    title_ne text not null,
    description_en text,
    description_ne text,
    base_rate decimal(10,2) not null,
    max_rate decimal(10,2),
    unit rate_unit default 'hour',
    is_negotiable boolean default false,
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Bookings table
create table bookings (
    id uuid primary key default uuid_generate_v4(),
    seeker_id uuid not null references users(id),
    provider_id uuid not null references service_providers(id),
    service_id uuid not null references provider_services(id),
    title text not null,
    description text,
    scheduled_date date not null,
    scheduled_time time not null,
    duration_hours decimal(4,2),
    status booking_status default 'pending',
    province text not null,
    district text not null,
    municipality text not null,
    ward integer,
    street_address text,
    special_instructions text,
    payment_method payment_method not null,
    base_amount decimal(10,2) not null,
    platform_fee decimal(10,2) not null,
    total_amount decimal(10,2) not null,
    payment_status payment_status default 'pending',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Reviews table
create table reviews (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid not null references bookings(id) on delete cascade,
    reviewer_id uuid not null references users(id),
    provider_id uuid not null references service_providers(id),
    rating integer not null check (rating >= 1 and rating <= 5),
    comment text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(booking_id)
);

-- Messages table
create table messages (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references bookings(id),
    sender_id uuid not null references users(id),
    receiver_id uuid not null references users(id),
    content text not null,
    is_read boolean default false,
    created_at timestamptz default now()
);

-- Provider skills table
create table provider_skills (
    id uuid primary key default uuid_generate_v4(),
    provider_id uuid not null references service_providers(id) on delete cascade,
    skill_name text not null,
    created_at timestamptz default now(),
    unique(provider_id, skill_name)
);

-- Provider portfolio table
create table provider_portfolio (
    id uuid primary key default uuid_generate_v4(),
    provider_id uuid not null references service_providers(id) on delete cascade,
    title text not null,
    description text,
    image_urls jsonb default '[]',
    project_date date not null,
    created_at timestamptz default now()
);

-- Provider availability table
create table provider_availability (
    id uuid primary key default uuid_generate_v4(),
    provider_id uuid not null references service_providers(id) on delete cascade,
    day_of_week integer not null check (day_of_week >= 0 and day_of_week <= 6), -- 0 = Sunday
    start_time time not null,
    end_time time not null,
    is_available boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(provider_id, day_of_week)
);

-- Notifications table
create table notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references users(id) on delete cascade,
    title text not null,
    message text not null,
    type notification_type not null,
    is_read boolean default false,
    created_at timestamptz default now()
);

-- Create indexes for better performance
create index idx_users_email on users(email);
create index idx_users_role on users(role);
create index idx_service_providers_location on service_providers(province, district);
create index idx_service_providers_rating on service_providers(rating_average desc);
create index idx_service_providers_availability on service_providers(is_available);
create index idx_provider_services_category on provider_services(category_id);
create index idx_provider_services_active on provider_services(is_active);
create index idx_bookings_seeker on bookings(seeker_id);
create index idx_bookings_provider on bookings(provider_id);
create index idx_bookings_status on bookings(status);
create index idx_bookings_date on bookings(scheduled_date);
create index idx_messages_conversation on messages(sender_id, receiver_id);
create index idx_messages_unread on messages(receiver_id, is_read);
create index idx_notifications_user_unread on notifications(user_id, is_read);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger update_users_updated_at before update on users for each row execute function update_updated_at_column();
create trigger update_service_providers_updated_at before update on service_providers for each row execute function update_updated_at_column();
create trigger update_provider_services_updated_at before update on provider_services for each row execute function update_updated_at_column();
create trigger update_bookings_updated_at before update on bookings for each row execute function update_updated_at_column();
create trigger update_reviews_updated_at before update on reviews for each row execute function update_updated_at_column();
create trigger update_provider_availability_updated_at before update on provider_availability for each row execute function update_updated_at_column();

-- Function to update provider rating when a new review is added
create or replace function update_provider_rating()
returns trigger as $$
begin
    if TG_OP = 'INSERT' then
        update service_providers 
        set 
            rating_average = (
                select round(avg(rating::numeric), 2) 
                from reviews 
                where provider_id = new.provider_id
            ),
            total_reviews = total_reviews + 1
        where id = new.provider_id;
    elsif TG_OP = 'UPDATE' then
        update service_providers 
        set 
            rating_average = (
                select round(avg(rating::numeric), 2) 
                from reviews 
                where provider_id = new.provider_id
            )
        where id = new.provider_id;
    elsif TG_OP = 'DELETE' then
        update service_providers 
        set 
            rating_average = coalesce((
                select round(avg(rating::numeric), 2) 
                from reviews 
                where provider_id = old.provider_id
            ), 0.00),
            total_reviews = greatest(total_reviews - 1, 0)
        where id = old.provider_id;
    end if;
    
    return coalesce(new, old);
end;
$$ language plpgsql;

-- Create trigger for rating updates
create trigger update_provider_rating_trigger
    after insert or update or delete on reviews
    for each row execute function update_provider_rating();

-- Function to update job completion count
create or replace function update_job_completion()
returns trigger as $$
begin
    if old.status != 'completed' and new.status = 'completed' then
        update service_providers 
        set total_jobs_completed = total_jobs_completed + 1
        where id = new.provider_id;
    elsif old.status = 'completed' and new.status != 'completed' then
        update service_providers 
        set total_jobs_completed = greatest(total_jobs_completed - 1, 0)
        where id = new.provider_id;
    end if;
    
    return new;
end;
$$ language plpgsql;

-- Create trigger for job completion updates
create trigger update_job_completion_trigger
    after update on bookings
    for each row execute function update_job_completion();

-- Create a view for provider statistics
create view provider_stats as
select 
    sp.id as provider_id,
    sp.user_id,
    u.full_name,
    sp.business_name,
    sp.province,
    sp.district,
    sp.rating_average,
    sp.total_reviews,
    sp.total_jobs_completed,
    sp.response_rate,
    sp.hourly_rate,
    sp.is_available,
    count(b.id) as total_bookings,
    count(case when b.status = 'completed' then 1 end) as completed_bookings,
    coalesce(sum(case when b.status = 'completed' then b.total_amount end), 0) as total_earnings
from service_providers sp
join users u on sp.user_id = u.id
left join bookings b on sp.id = b.provider_id
group by sp.id, u.full_name;

-- FIXED: Function to search providers (removed parameter name conflict)
create or replace function search_providers(
    search_term text default null,
    category_id uuid default null,
    filter_province text default null,
    filter_district text default null,
    min_rating decimal default 0,
    max_rate decimal default null
)
returns table (
    id uuid,
    full_name text,
    business_name text,
    bio text,
    province text,
    district text,
    rating_average decimal,
    hourly_rate decimal,
    is_available boolean
) as $$
begin
    return query
    select 
        sp.id,
        u.full_name,
        sp.business_name,
        sp.bio,
        sp.province,
        sp.district,
        sp.rating_average,
        sp.hourly_rate,
        sp.is_available
    from service_providers sp
    join users u on sp.user_id = u.id
    left join provider_services ps on sp.id = ps.provider_id
    where 
        sp.is_available = true
        and (search_term is null or 
             u.full_name ilike '%' || search_term || '%' or
             sp.business_name ilike '%' || search_term || '%' or
             sp.bio ilike '%' || search_term || '%')
        and (category_id is null or ps.category_id = category_id)
        and (filter_province is null or sp.province = filter_province)
        and (filter_district is null or sp.district = filter_district)
        and sp.rating_average >= coalesce(min_rating, 0)
        and (max_rate is null or sp.hourly_rate <= max_rate)
    group by sp.id, u.full_name
    order by sp.rating_average desc, sp.total_reviews desc;
end;
$$ language plpgsql;

-- Insert sample service categories
insert into service_categories (name_en, name_ne, icon, color, sort_order) values
('Digital & Online Services', 'डिजिटल र अनलाइन सेवाहरू', '💻', 'bg-blue-500', 1),
('Trade & Skilled Labor', 'व्यापार र दक्ष श्रम', '🔧', 'bg-orange-500', 2),
('Automotive Services', 'वाहन सेवाहरू', '🚗', 'bg-red-500', 3),
('Creative & Artisanal', 'रचनात्मक र कलात्मक', '🎨', 'bg-purple-500', 4),
('Online Business & Passive Income', 'अनलाइन व्यवसाय र निष्क्रिय आम्दानी', '💰', 'bg-green-500', 5),
('Teaching & Coaching', 'शिक्षण र प्रशिक्षण', '🎓', 'bg-indigo-500', 6),
('Personal Care & Lifestyle', 'व्यक्तिगत हेरचाह र जीवनशैली', '💅', 'bg-pink-500', 7),
('Events & Hospitality', 'कार्यक्रम र आतिथ्यता', '🎉', 'bg-yellow-500', 8),
('Safety & Tech Setup', 'सुरक्षा र प्रविधि सेटअप', '🔒', 'bg-gray-500', 9),
('Niche & Fun Services', 'विशेष र मनोरञ्जन सेवाहरू', '🎲', 'bg-teal-500', 10);

-- Row Level Security (RLS) policies
alter table users enable row level security;
alter table service_providers enable row level security;
alter table provider_services enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table messages enable row level security;
alter table provider_skills enable row level security;
alter table provider_portfolio enable row level security;
alter table provider_availability enable row level security;
alter table notifications enable row level security;

-- Users policies
create policy "Users can view their own profile" on users for select using (auth.uid() = id);
create policy "Users can update their own profile" on users for update using (auth.uid() = id);

-- Service providers policies
create policy "Anyone can view active providers" on service_providers for select using (is_available = true);
create policy "Providers can update their own profile" on service_providers for update using (auth.uid() = user_id);
create policy "Providers can insert their own profile" on service_providers for insert with check (auth.uid() = user_id);

-- Provider services policies
create policy "Anyone can view active services" on provider_services for select using (is_active = true);
create policy "Providers can manage their own services" on provider_services for all using (
    provider_id in (select id from service_providers where user_id = auth.uid())
);

-- Bookings policies
create policy "Users can view their own bookings" on bookings for select using (
    auth.uid() = seeker_id or 
    auth.uid() = (select user_id from service_providers where id = provider_id)
);
create policy "Seekers can create bookings" on bookings for insert with check (auth.uid() = seeker_id);
create policy "Booking participants can update bookings" on bookings for update using (
    auth.uid() = seeker_id or 
    auth.uid() = (select user_id from service_providers where id = provider_id)
);

-- Messages policies
create policy "Users can view their own messages" on messages for select using (
    auth.uid() = sender_id or auth.uid() = receiver_id
);
create policy "Users can send messages" on messages for insert with check (auth.uid() = sender_id);
create policy "Users can update their received messages" on messages for update using (auth.uid() = receiver_id);

-- Reviews policies
create policy "Anyone can view reviews" on reviews for select to authenticated;
create policy "Booking seekers can create reviews" on reviews for insert with check (
    auth.uid() = (select seeker_id from bookings where id = booking_id)
);

-- Notifications policies
create policy "Users can view their own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update their own notifications" on notifications for update using (auth.uid() = user_id);

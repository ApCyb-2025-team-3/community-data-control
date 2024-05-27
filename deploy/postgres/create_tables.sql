CREATE TABLE IF NOT EXISTS public.event_log
(
    event_date     date,
    created_at     timestamp(6) without time zone,
    id             uuid NOT NULL primary key,
    user_id        uuid,
    description    character varying(255),
    new_value      character varying(255),
    previous_value character varying(255),
    type           character varying(255),
    CONSTRAINT event_log_type_check CHECK (((type)::text = ANY
                                            ((ARRAY ['ADD_USER'::character varying, 'DISMISS_USER'::character varying, 'CHANGE_PROJECT'::character varying, 'CHANGE_GRADE'::character varying, 'CHANGE_ROLE'::character varying, 'CHANGE_PERSONAL_DATA'::character varying, 'CREATE_GROUP'::character varying, 'DISBAND_GROUP'::character varying, 'ACCEPT_TO_GROUP'::character varying, 'EXCLUDE_FROM_GROUP'::character varying, 'JOINING_THE_MENTORING_PROGRAM'::character varying, 'EXIT_FROM_THE_MENTORING_PROGRAM'::character varying])::text[])))
);

CREATE TABLE IF NOT EXISTS public.users
(
    dob                date,
    invited_at         date,
    is_active          boolean NOT NULL,
    project_changed_at date,
    id                 uuid NOT NULL primary key,
    supervisor_id      uuid,
    department         character varying(126),
    email              character varying(126),
    grade              character varying(126),
    mentor_status      character varying(126),
    name               character varying(126),
    phone_number       character varying(126),
    project            character varying(126),
    role               character varying(126),
    CONSTRAINT users_grade_check CHECK (((grade)::text = ANY
                                         ((ARRAY ['JUNIOR'::character varying, 'MIDDLE'::character varying, 'SENIOR'::character varying, 'TEAM_LEAD'::character varying, 'UNSPECIFIED'::character varying])::text[]))),
    CONSTRAINT users_mentor_status_check CHECK (((mentor_status)::text = ANY
                                                 ((ARRAY ['MENTOR'::character varying, 'MENTEE'::character varying, 'NOT_PARTICIPATING'::character varying])::text[]))),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY
                                        ((ARRAY ['MEMBER'::character varying, 'DATA_ENGINEER'::character varying, 'DEVELOPER'::character varying, 'TEAM_LEAD'::character varying, 'PRODUCT_OWNER'::character varying, 'SUPERVISOR'::character varying, 'NON_MEMBER'::character varying])::text[])))
);
ALTER TABLE ONLY public.users ADD CONSTRAINT fkpgopks9vl2c3kw6rb5ivil2vo FOREIGN KEY (supervisor_id) REFERENCES public.users(id);

CREATE TABLE public.mentorships
(
    creation_date    date,
    disbandment_date date,
    id               uuid NOT NULL primary key,
    mentee_id        uuid unique,
    mentor_id        uuid
);
ALTER TABLE ONLY public.mentorships ADD CONSTRAINT fkhsb5aatljmrs1upayyxrqfxrn FOREIGN KEY (mentee_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.mentorships ADD CONSTRAINT fkpalfyuenepsdpn9cwpcskgp1n FOREIGN KEY (mentor_id) REFERENCES public.users(id);

CREATE TABLE public.subgroups
(
    is_active          boolean NOT NULL,
    creation_date      date,
    disbandment_date   date,
    updated_date       date,
    id                 uuid NOT NULL primary key,
    team_lead_id       uuid,
    description        character varying(255),
    disbandment_reason character varying(255),
    name               character varying(255),
    type               character varying(255),
    CONSTRAINT subgroups_type_check CHECK (((type)::text = ANY
                                            ((ARRAY ['WORKING_TEAM'::character varying, 'INTEREST_GROUP'::character varying])::text[])))
);
ALTER TABLE ONLY public.subgroups ADD CONSTRAINT fkmetgweky6jd0fwytkuoms3luw FOREIGN KEY (team_lead_id) REFERENCES public.users(id);

CREATE TABLE public.subgroups_members
(
    groups_id  uuid NOT NULL,
    members_id uuid NOT NULL
);
ALTER TABLE ONLY public.subgroups_members ADD CONSTRAINT fk2ebosq8muhvldvb32nxnbt5ku FOREIGN KEY (members_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.subgroups_members ADD CONSTRAINT fkm158ylp7f7vahp95y2p1swmt7 FOREIGN KEY (groups_id) REFERENCES public.subgroups(id);

CREATE TABLE public.users_product_owners
(
    product_owners_id uuid NOT NULL,
    user_id           uuid NOT NULL
);
ALTER TABLE ONLY public.users_product_owners ADD CONSTRAINT fk350790x5rj4d2j8ork5enob2q FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE ONLY public.users_product_owners ADD CONSTRAINT fkr5gih8qphmmp9dcrc0foxxhsr FOREIGN KEY (product_owners_id) REFERENCES public.users(id);

CREATE TABLE public.users_entity
(
    user_id bigserial primary key,
    name character varying(255) NOT NULL,
    node_id character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    source character varying(50) NOT NULL
    CONSTRAINT users_entity_role_check CHECK (((role)::text = ANY
                                            ((ARRAY ['ROLE_USER'::character varying, 'ROLE_ADMIN'::character varying])::text[]))),
    CONSTRAINT users_entity_source_check CHECK (((source)::text = ANY
                                              ((ARRAY ['GITHUB'::character varying, 'GOOGLE'::character varying])::text[])))
);

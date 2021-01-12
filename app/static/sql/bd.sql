create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1"; 
CREATE TABLE IF NOT EXISTS works (
	work_id uuid DEFAULT uuid_generate_v4 (),
	title varchar(120),
	img varchar(240),
	information varchar(240),
	skills varchar(120), 
	url varchar(240),
	main boolean,
	state boolean,
	primary key(work_id)
);
CREATE TABLE IF NOT EXISTS researchs(
	research_id uuid DEFAULT uuid_generate_v4 (),
	title varchar(120),
	editorial varchar(120),
	abstract varchar(240),
	link varchar(240),
	github varchar(240),
	state boolean,
	primary key(research_id)
);

CREATE TABLE IF NOT EXISTS info_init(
	init_id uuid DEFAULT uuid_generate_v4 (),
	greeting varchar(120),
	name varchar(120),
	phrase varchar(120),
	introduce varchar(240),
	email_link varchar(240),
	state boolean,
	primary key(init_id)
);

CREATE TABLE IF NOT EXISTS info_me(
	me_id uuid DEFAULT uuid_generate_v4 (),
	greeting varchar(120),
	content varchar(240),
	goal varchar(240),
	finish varchar(120),
	img varchar(240),
	state boolean,
	primary key(me_id)
);

CREATE TABLE IF NOT EXISTS skills(
	skill_id serial,
	name varchar(120),
	me_id uuid,
	primary key(skill_id),
	foreign key(me_id) references info_me(me_id)
);

CREATE TABLE IF NOT EXISTS me(
	me_id serial,
	name varchar(120),
	last_name varchar(120),
	email varchar(120),
	cv varchar(240),
	facebook varchar(120),
	linkedin varchar(120),
	github varchar(120),
	primary key(me_id)
);
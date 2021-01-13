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
	editorial varchar(30),
	abstract varchar(340),
	link varchar(120),
	github varchar(120),
	state boolean,
	primary key(research_id)
);

CREATE TABLE IF NOT EXISTS info_init(
	init_id uuid DEFAULT uuid_generate_v4 (),
	greeting varchar(30),
	name varchar(30),
	phrase varchar(60),
	introduce varchar(240),
	email_link varchar(240),
	state boolean,
	primary key(init_id)
);

CREATE TABLE IF NOT EXISTS info_me(
	me_id uuid DEFAULT uuid_generate_v4 (),
	greeting varchar(240),
	content varchar(240),
	goal varchar(240),
	finish varchar(120),
	img varchar(240),
	state boolean,
	primary key(me_id)
);

CREATE TABLE IF NOT EXISTS skills(
	skill_id serial,
	name varchar(30),
	me_id uuid,
	primary key(skill_id),
	foreign key(me_id) references info_me(me_id)
);

CREATE TABLE IF NOT EXISTS me(
	me_id serial,
	name varchar(30),
	last_name varchar(30),
	email varchar(60),
	cv varchar(120),
	facebook varchar(120),
	linkedin varchar(120),
	github varchar(120),
	primary key(me_id)
);
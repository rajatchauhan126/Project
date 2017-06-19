#!/bin/bash

cqlsh -e "create keyspace mock_testdb2 with replication = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }"
cqlsh -e "use mock_testdb2"
cqlsh -e "create table mock_testdb2.circle (id uuid primary key)"
cqlsh -e "create table mock_testdb2.mailbox(id uuid primary key)"
cqlsh -e "create table mock_testdb2.follow(id uuid primary key,circleId text,mailboxId text)"

exit

create TABLE roles(
    id SERIAL PRIMARY KEY,
    roleName VARCHAR(255)
)

create TABLE user(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    roleId INTEGER,
    FOREIGN KEY (roleId) REFERENCES roles (id)
)

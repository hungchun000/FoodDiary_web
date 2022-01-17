
-- // Database 'fooddiary' //

-- TABLE member
DROP TABLE IF EXISTS member;
CREATE TABLE member (
	mId char(8) NOT NULL,
	Password varchar(12) NOT NULL,
    Password varchar(12) NOT NULL,
	IsAdmin boolean default false,
	Color varchar(10) NOT NULL,
	Nickname varchar(21) ,
	PRIMARY KEY (UserID)
) CHARSET=utf8mb4 ;
CREATE INDEX Users_index on Users(UserID);



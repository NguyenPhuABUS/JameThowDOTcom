-- Drop database if it exists
DROP DATABASE IF EXISTS JamesThewDOTcom;
GO

-- Create new database
CREATE DATABASE JamesThewDOTcom;
GO

-- Use the newly created database
USE JamesThewDOTcom;
GO

-- Table for storing user information
CREATE TABLE Users (
    user_id INT IDENTITY PRIMARY KEY, -- User ID (primary key)
    username VARCHAR(50) NOT NULL UNIQUE, -- Username (unique)
    password VARCHAR(255) NOT NULL, -- Password
    email VARCHAR(100) NOT NULL UNIQUE, -- Email (unique)
    full_name VARCHAR(100), -- Full name
    avatar_url VARCHAR(255), -- User avatar URL
    status BIT DEFAULT 0 -- User status (default 0)
);

-- Table for storing categories
CREATE TABLE Categories (
    category_id INT IDENTITY PRIMARY KEY, -- Category ID (primary key)
    category_name VARCHAR(100) NOT NULL -- Category name
);

-- Table for storing recipe and tip contents
CREATE TABLE Contents (
    content_id INT IDENTITY PRIMARY KEY, -- Content ID (primary key)
    title VARCHAR(100), -- Content title
    content_type VARCHAR(50) NOT NULL, -- Content type (recipe or tip)
    content TEXT NOT NULL, -- Content details (ingredients/instructions or tips)
    image_url VARCHAR(255), -- Content image URL
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Creation date and time
    updated_at DATETIME, -- Update date and time
    is_free BIT DEFAULT 0, -- Content is free or not (0 for not free, 1 for free)
    user_id INT, -- User ID who posted the content (foreign key)
    category_id INT, -- Category ID (foreign key)
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) -- Foreign key referencing Categories table
);

-- Table for storing cooking contests
CREATE TABLE Contests (
    contest_id INT IDENTITY PRIMARY KEY, -- Contest ID (primary key)
    title VARCHAR(100) NOT NULL, -- Contest title
    description TEXT NOT NULL, -- Contest description
    start_date DATE NOT NULL, -- Contest start date
    end_date DATE NOT NULL, -- Contest end date
    winner_user_id INT, -- User ID of the contest winner (foreign key)
    FOREIGN KEY (winner_user_id) REFERENCES Users(user_id) -- Foreign key referencing Users table
);

-- Table for storing contest entries
CREATE TABLE ContestEntries (
    entry_id INT IDENTITY PRIMARY KEY, -- Entry ID (primary key)
    contest_id INT, -- Contest ID (foreign key)
    user_id INT, -- User ID of the participant (foreign key)
    content_id INT, -- Content ID of the entry (foreign key)
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Submission date and time
    score DECIMAL(10, 2), -- Score of the entry
    FOREIGN KEY (contest_id) REFERENCES Contests(contest_id), -- Foreign key referencing Contests table
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (content_id) REFERENCES Contents(content_id) -- Foreign key referencing Contents table
);

-- Table for storing user feedback
CREATE TABLE Feedback (
    feedback_id INT IDENTITY PRIMARY KEY, -- Feedback ID (primary key)
    content TEXT NOT NULL, -- Feedback content
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Creation date and time
    user_id INT, -- User ID who submitted the feedback (foreign key)
    content_id INT, -- Content ID that is being feedbacked (foreign key)
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (content_id) REFERENCES Contents(content_id) -- Foreign key referencing Contents table
);

-- Table for storing admin announcements
CREATE TABLE Announcements (
    announcement_id INT IDENTITY PRIMARY KEY, -- Announcement ID (primary key)
    content TEXT NOT NULL, -- Announcement content
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- Creation date and time
);

-- Table for storing frequently asked questions
CREATE TABLE FAQs (
    faq_id INT IDENTITY PRIMARY KEY, -- FAQ ID (primary key)
    question TEXT NOT NULL, -- FAQ question
    answer TEXT NOT NULL -- FAQ answer
);

-- Table for storing subscription information
CREATE TABLE Subscriptions (
    subscription_id INT IDENTITY PRIMARY KEY, -- Subscription ID (primary key)
    user_id INT, -- User ID (foreign key)
    type VARCHAR(100) NOT NULL, -- Subscription type
    start_date DATE NOT NULL, -- Subscription start date
    end_date DATE NOT NULL, -- Subscription end date
    status VARCHAR(10) DEFAULT 'active', -- Subscription status
    PackageId INT, -- Package ID (foreign key)
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (PackageId) REFERENCES Packages(PackageId) -- Foreign key referencing Packages table
);

-- Table for storing package details
CREATE TABLE Packages (
    PackageId INT IDENTITY PRIMARY KEY, -- Package ID (primary key)
    PackageName VARCHAR(100) NOT NULL, -- Package name
    Price DECIMAL(10, 2) NOT NULL, -- Package price
    Description TEXT, -- Package description
    DurationMonths INT NOT NULL -- Package duration in months
);

-- Table for storing payment transactions
CREATE TABLE Payments (
    payment_id INT IDENTITY PRIMARY KEY, -- Payment ID (primary key)
    user_id INT, -- User ID (foreign key)
    subscription_id INT, -- Subscription ID (foreign key)
    amount DECIMAL(10, 2) NOT NULL, -- Payment amount
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Payment date and time
    payment_method VARCHAR(50) NOT NULL, -- Payment method
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (subscription_id) REFERENCES Subscriptions(subscription_id) -- Foreign key referencing Subscriptions table
);

-- Table for storing roles
CREATE TABLE Roles (
    role_id INT IDENTITY PRIMARY KEY, -- Role ID (primary key)
    role_name VARCHAR(50) NOT NULL UNIQUE -- Role name (unique)
);

-- Table for storing user roles
CREATE TABLE UserRoles (
    user_id INT, -- User ID (foreign key)
    role_id INT, -- Role ID (foreign key)
    PRIMARY KEY (user_id, role_id), -- Composite primary key
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (role_id) REFERENCES Roles(role_id) -- Foreign key referencing Roles table
);

-- Table for storing user ratings
CREATE TABLE Ratings (
    rating_id INT IDENTITY PRIMARY KEY, -- Rating ID (primary key)
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5), -- Rating (1 to 5 stars)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Creation date and time
    user_id INT, -- User ID who submitted the rating (foreign key)
    content_id INT, -- Content ID that is being rated (foreign key)
    FOREIGN KEY (user_id) REFERENCES Users(user_id), -- Foreign key referencing Users table
    FOREIGN KEY (content_id) REFERENCES Contents(content_id) -- Foreign key referencing Contents table
);

-- Table for storing user contacts
CREATE TABLE Contacts (
    contact_id INT IDENTITY PRIMARY KEY, -- Contact ID (primary key)
    name VARCHAR(100) NOT NULL, -- Contact name
    email VARCHAR(100) NOT NULL, -- Contact email
    message TEXT NOT NULL, -- Contact message
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP -- Creation date and time
);

-- Trigger to update user role on subscription expiry
CREATE TRIGGER trg_UpdateUserRoleOnSubscriptionExpiry
ON Subscriptions
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Variables to store UserId and SubscriptionId
    DECLARE @UserId INT;
    DECLARE @SubscriptionId INT;

    -- Check expired subscriptions and update role
    SELECT @UserId = inserted.user_id, @SubscriptionId = inserted.subscription_id
    FROM inserted
    JOIN deleted ON inserted.subscription_id = deleted.subscription_id
    WHERE inserted.end_date <= GETDATE() AND inserted.status = 'active';

    IF @UserId IS NOT NULL
    BEGIN
        -- Update subscription status to "expired"
        UPDATE Subscriptions
        SET status = 'expired'
        WHERE subscription_id = @SubscriptionId;

        -- Get RoleId of "User Super" role
        DECLARE @SuperUserRoleId INT;
        SELECT @SuperUserRoleId = role_id FROM Roles WHERE role_name = 'User Super';

        -- Remove "User Super" role from user if exists
        IF @SuperUserRoleId IS NOT NULL
        BEGIN
            DELETE FROM UserRoles WHERE user_id = @UserId AND role_id = @SuperUserRoleId;
        END
    END
END;
GO

-- Trigger to update contest winner based on ratings
CREATE TRIGGER trg_UpdateContestWinner
ON Contests
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @contestId INT;
    DECLARE @endDate DATE;
    
    SELECT @contestId = INSERTED.contest_id, @endDate = INSERTED.end_date
    FROM INSERTED;
    
    -- Check if the contest has ended
    IF @endDate <= GETDATE()
    BEGIN
        -- Calculate scores for each entry
        UPDATE ContestEntries
        SET score = (
            SELECT AVG(r.rating)
            FROM Ratings r
            WHERE r.content_id = ContestEntries.content_id
        )
        WHERE contest_id = @contestId;

        -- Determine the highest score
        DECLARE @maxScore DECIMAL(10, 2);
        SELECT @maxScore = MAX(score)
        FROM ContestEntries
        WHERE contest_id = @contestId;

        -- Randomly select a winner among the highest scorers
        DECLARE @winnerUserId INT;
        SELECT TOP 1 @winnerUserId = user_id
        FROM ContestEntries
        WHERE contest_id = @contestId AND score = @maxScore
        ORDER BY NEWID();

        -- Update contest winner
        UPDATE Contests
        SET winner_user_id = @winnerUserId
        WHERE contest_id = @contestId;
    END
END;
GO

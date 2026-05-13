# Betwin Database Setup

## Database Choice: PostgreSQL

PostgreSQL is chosen for this betting platform because:
- ✅ ACID compliance (critical for financial transactions)
- ✅ Enterprise-grade security
- ✅ Excellent performance at scale
- ✅ Used by top betting platforms worldwide

## Installation & Setup

### 1. Install PostgreSQL
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### 2. Create Database & User

```sql
-- Connect as postgres user
psql -U postgres

-- Create database
CREATE DATABASE betwin_db;

-- Create dedicated user
CREATE USER betwin_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
ALTER ROLE betwin_user SET client_encoding TO 'utf8';
ALTER ROLE betwin_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE betwin_user SET default_transaction_deferrable TO on;
ALTER ROLE betwin_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE betwin_db TO betwin_user;
```

### 3. Setup Backend Environment

```bash
cd server
cp .env.example .env

# Edit .env with your credentials
# DATABASE_PASSWORD=your_secure_password
```

### 4. Initialize Database Schema

```bash
npm install
npm run db:init
```

### 5. Start Backend Server

```bash
npm run dev  # Development with auto-reload
npm start    # Production
```

## Tables Overview

| Table | Purpose |
|-------|---------|
| `users` | User accounts, balance, status |
| `bets` | Betting records with odds & status |
| `transactions` | Deposits, withdrawals, payouts |
| `bonuses` | Promotional bonuses & loyalty rewards |

## Security Features

- ✅ Role-based database access
- ✅ Parameterized queries (SQL injection prevention)
- ✅ ACID transactions for financial integrity
- ✅ Encrypted password storage (bcryptjs)
- ✅ JWT authentication ready

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - All users
- `GET /api/users/:id` - User details
- `GET /api/users/:id/bets` - User's bets
- `GET /api/users/:id/bonuses` - Available bonuses
- `POST /api/bets` - Place new bet

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/betwin_db
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=betwin_db
DATABASE_USER=betwin_user
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
API_PORT=3001
NODE_ENV=development
```

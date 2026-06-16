-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "name" TEXT,
    "image" TEXT,
    "grade" TEXT,
    "province" TEXT,
    "score" REAL,
    "subjectCombo" TEXT,
    "targetPath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Major" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courses" TEXT NOT NULL,
    "hardPoints" TEXT NOT NULL,
    "abilities" TEXT NOT NULL,
    "relatedMajors" TEXT NOT NULL,
    "aiRisk" TEXT NOT NULL,
    "aiRiskLevel" INTEGER NOT NULL,
    "employmentRate" REAL,
    "matchRate" REAL
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "baoYanRate" REAL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UniversityMajor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "universityId" TEXT NOT NULL,
    "majorId" TEXT NOT NULL,
    "admissionScore" REAL,
    "admissionRank" INTEGER,
    "year" INTEGER NOT NULL,
    "subjectReq" TEXT,
    CONSTRAINT "UniversityMajor_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UniversityMajor_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmploymentStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "majorId" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "ratio" REAL NOT NULL,
    "cityDistribution" TEXT,
    CONSTRAINT "EmploymentStat_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CareerPath" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "majorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    CONSTRAINT "CareerPath_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "majorId" TEXT NOT NULL,
    "cityTier" TEXT NOT NULL,
    "year0" REAL,
    "year3" REAL,
    "year5" REAL,
    "year10" REAL,
    CONSTRAINT "Salary_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CareerDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "expense" TEXT NOT NULL,
    "monthlyJoy" TEXT NOT NULL,
    "monthlyWorry" TEXT NOT NULL,
    "adviceToSelf" TEXT NOT NULL,
    "satisfaction" INTEGER NOT NULL,
    "majorId" TEXT,
    CONSTRAINT "CareerDay_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Regret" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grade" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "isLate" BOOLEAN NOT NULL,
    "remedy" TEXT,
    "majorId" TEXT,
    CONSTRAINT "Regret_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserRegret" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "regretId" TEXT NOT NULL,
    "markedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserRegret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserRegret_regretId_fkey" FOREIGN KEY ("regretId") REFERENCES "Regret" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuideProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    CONSTRAINT "GuideProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Major_code_key" ON "Major"("code");

-- CreateIndex
CREATE UNIQUE INDEX "University_code_key" ON "University"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserRegret_userId_regretId_key" ON "UserRegret"("userId", "regretId");

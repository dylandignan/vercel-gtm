import { exec } from "child_process"
import { config } from 'dotenv'
import { promisify } from "util"

const execAsync = promisify(exec)

config({ path: '.env.local' });

async function setupDatabase() {
  console.log("🚀 Setting up database...")

  try {
    
    if (!process.env.POSTGRES_URL) {
      console.error("❌ POSTGRES_URL environment variable is not set")
      console.log("Please set your DATABASE_URL in the environment variables")
      process.exit(1)
    }

    console.log("✅ POSTGRES_URL is configured")

    
    console.log("📝 Generating migration files...")
    await execAsync("pnpm db:generate")
    console.log("✅ Migration files generated")

    
    console.log("🔄 Pushing schema to database...")
    await execAsync("pnpm db:push")
    console.log("✅ Schema pushed to database")

    
    console.log("🌱 Seeding database with sample data...")
    await execAsync("pnpm db:seed")
    console.log("✅ Database seeded successfully")

    console.log("\n🎉 Database setup complete!")
    console.log("You can now:")
    console.log("- Visit /admin/leads to see the lead management interface")
    console.log("- Use the main form to create new leads")
    console.log("- Run 'pnpm db:studio' to view the database in Drizzle Studio")
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()

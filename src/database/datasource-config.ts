import { DataSource } from "typeorm"
//import { Category } from "../modules/cars/entities/Category"


export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "database_ignite",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"], 
})

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

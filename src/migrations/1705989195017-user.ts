// Importações necessárias para criar migrações com TypeORM
import { MigrationInterface, QueryRunner, Table } from "typeorm";

// ARQUIVO CRIADO APOS EXECUTAR O SEGUINTE COMANDO NA RAIZ DO PROJETO:
// "npx typeorm migration:create ./src/migrations/user"

// Define a classe de migração, que implementa a interface MigrationInterface
export class User1705989195017 implements MigrationInterface {

    // Método 'up' que será chamado quando a migração for executada
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Utiliza o QueryRunner para criar uma nova tabela
        await queryRunner.createTable(new Table({
            name: "user", // Nome da tabela
            columns: [    // Define as colunas da tabela
                {
                    name: "id",              // Nome da coluna
                    type: "uuid",            // Tipo da coluna
                    isPrimary: true,         // Define como chave primária
                    isGenerated: true,       // Indica que o valor é gerado automaticamente
                    generationStrategy: "uuid" // Estratégia de geração (neste caso, uuid)
                },
                {
                    name: "name",            // Nome da coluna
                    type: "varchar"          // Tipo da coluna (string)
                },
                {
                    name: "email",           // Nome da coluna
                    type: "varchar",         // Tipo da coluna (string)
                    isUnique: true           // Indica que os valores nesta coluna devem ser únicos
                },
                {
                    name: "password",        // Nome da coluna
                    type: "varchar"          // Tipo da coluna (string para armazenar senhas hash)
                }
            ]
        }));
    }

    // Método 'down' que será chamado para reverter a migração, se necessário
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Aqui você pode definir a lógica para reverter a migração, como excluir a tabela
    }

}

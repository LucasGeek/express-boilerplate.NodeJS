// Importações necessárias para definir a entidade, gerar UUIDs e hashear senhas
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { hash, verify } from 'argon2';

// Anotação Entity para marcar a classe como uma entidade do TypeORM
@Entity()
export class User {
    // Define a coluna 'id' como chave primária gerada automaticamente do tipo UUID
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Define a coluna 'name' para armazenar o nome do usuário
    @Column()
    name: string;

    // Define a coluna 'email' que é única para cada usuário
    @Column({ unique: true })
    email: string;

    // Define a coluna 'password' para armazenar a senha do usuário
    @Column()
    password: string;

    // Decorador BeforeInsert que define uma ação a ser executada antes da inserção da entidade no banco
    @BeforeInsert()
    addId() {
        // Gera um UUID para o 'id' do usuário antes de inserir no banco
        this.id = uuidv4();
    }

    // Outro decorador BeforeInsert para uma ação diferente
    @BeforeInsert()
    async hashPassword() {
        // Hashea a senha do usuário antes de inserir no banco
        this.password = await hash(this.password);
    }

    async verify(password: string) {
        return await verify(this.password, password)
    }

    toJSON() {
        const { password, ...user } = this;
        return user;
    }
}

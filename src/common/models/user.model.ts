import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import {sequelize} from "../configs/db.config";

export interface UserAttributes {
    id: string;
    name: string | null;
    email: string;
    password?: string;
    emailVerified?: Date | null;
    image?: string | null;
}

// Sequelize требует указать какие поля необязательны при создании
type UserCreationAttributes = Optional<UserAttributes, 'id' | 'name' | 'image' | 'emailVerified'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string | null;
    public email!: string;
    public password?: string;
    public emailVerified?: Date | null;
    public image?: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuidv4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailVerified: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        underscored: true,
        tableName: 'users',
        timestamps: true,
    }
);
import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import {sequelize} from "../configs/db.config";

export interface PostAttributes {
    id: string;
    title: string;
    image?: string;
    description: string;
    userId: string;
}

type PostCreationAttributes = Optional<PostAttributes, 'id' | 'image'>;

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: string;
    public title!: string;
    public image?: string;
    public description!: string;
    public userId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        underscored: true,
        tableName: 'posts',
        timestamps: true,
    }
);

User.hasMany(Post, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'posts',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
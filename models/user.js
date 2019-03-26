module.exports = function(sequelize, DataTypes) {
    // Sequelize model to create `Customers` table in db
    let User = sequelize.define("User", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            validate: {
                len: [1]
            }
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['username']
        }]
    });

    User.associate = function(models) {
        // Associating User with Gigs
        User.hasMany(models.Gig, {});
        User.hasMany(models.Rating, {});
    };
    return User;
};

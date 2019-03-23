module.exports = function(sequelize, DataTypes) {
  // Sequelize model to create `gigs` table in db
  let Gig = sequelize.define("Gig", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date_needed: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    amount_offered: {
      type: DataTypes.DATE,
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Uncategorized",
      validate: {
        len: [1]
      }
    }
  });

  Gig.associate = function(models) {
    // Gigs are associated with the user that posted it
    Gig.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Gig;
};

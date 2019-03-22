module.exports = function(sequelize, DataTypes) {
  // Sequelize model to create `Customers` table in db
  let Rating = sequelize.define("Rating", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Rating.associate = function(models) {
    // Associating Ratings with User
    Rating.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Rating;
};

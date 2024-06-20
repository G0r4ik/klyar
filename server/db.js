import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  'postgres://postgres.wamwckmzhbrlxshepvsp:nikitaPhoto6666!@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'
)

export const Service = sequelize.define('service', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, allowNull: false },
  img: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  price: { type: Sequelize.INTEGER, allowNull: false },
})

export const Cart = sequelize.define('cart', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: Sequelize.TEXT },
  date_of_registration: { type: Sequelize.DATE },
  service_id: {
    type: Sequelize.INTEGER,
    references: { model: Service, key: 'id' },
  },
})

Service.hasMany(Cart, { foreignKey: 'service_id' })
Cart.belongsTo(Service, { foreignKey: 'service_id' })

// Service.sync({ alter: true })
// Cart.sync({ alter: true })

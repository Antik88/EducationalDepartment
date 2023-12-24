const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  subdivision_id: DataTypes.INTEGER,
  category_id: DataTypes.INTEGER,
  deadline: DataTypes.DATE,
  planned_result: DataTypes.STRING,
  completion_status: DataTypes.BOOLEAN,
  note: DataTypes.STRING
});

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  faculty_id: DataTypes.INTEGER
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
});

const Subdivision = sequelize.define('Subdivision', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
});

const Organizers = sequelize.define('Organizers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: DataTypes.INTEGER,
  student_id: DataTypes.INTEGER,
  faculty_id: DataTypes.INTEGER
});

const Invitees = sequelize.define('Invitees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING
  },
  position: {
    type: DataTypes.STRING
  },
  organization: {
    type: DataTypes.STRING
  }
});

const EventInvitees = sequelize.define('EventInvitees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: DataTypes.INTEGER,
});

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING
  },
  group_number: {
    type: DataTypes.INTEGER
  }
});

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING
  },
  group_name: {
    type: DataTypes.STRING
  }
});

const Violation = sequelize.define('Violation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_id: DataTypes.INTEGER,
  article: DataTypes.STRING,
  date_committed: DataTypes.DATE,
  court_decision: DataTypes.STRING,
  penalty: DataTypes.STRING
});

const Faculty = sequelize.define('Faculty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
});

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, unique: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

// Event.belongsTo(Department, { foreignKey: 'department_id' });
Event.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
// Event.belongsTo(Organizers, { foreignKey: 'organizers_id' });
Event.hasMany(Organizers, { foreignKey: 'event_id' });
Event.belongsTo(Subdivision, { foreignKey: 'subdivision_id', as: 'subdivision' });
Event.belongsToMany(Invitees, { through: EventInvitees, foreignKey: 'event_id' });

Organizers.belongsTo(Employee, { foreignKey: 'employee_id' });
Organizers.belongsTo(Student, { foreignKey: 'student_id' });

Department.belongsTo(Faculty, { foreignKey: 'faculty_id' });

Violation.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

module.exports = {
  Event,
  Department,
  Category,
  Subdivision,
  Organizers,
  Invitees,
  EventInvitees,
  Employee,
  Student,
  Violation,
  Faculty,
  User
};
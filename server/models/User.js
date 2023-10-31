const { Schema, model } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // This only works when you generate the collection (if you add in it after you have to delete and recreate the collection)
        min: [2, 'Username must be at least 2 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
            },
            message() {
                return 'You must enter a valid email address'
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password must be at least 6 characters long']
    },
    shops: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    ]
}, {
    methods: {
        async validatePass(formPassword) {
            const is_valid = await compare(formPassword, this.password);

            return is_valid;
        }
    },
    // Property you can generate when you pull a User from the db (not stored to the db itself)
    // Pretty useless here but can be used for lots of things like combining a user's first and last name or getting the length of an array stored to the user
    virtuals: {
        userData: {
            get() {
                return this.username + ' - ' + this.email;
            }
        }
    },
    toJSON: {
        virtuals: true
    }
});

// Hook into pre-save schema (before user is stored to db) to encrypt user's password
userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await hash(this.password, 10);
    }

    next();
});

// Remove the user's password from the JSON responses
userSchema.methods.toJSON = function() {
    const user = this.toObject();   

    delete user.password;

    return user;
}

const User = model('User', userSchema);

module.exports = User;
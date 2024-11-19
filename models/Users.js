import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    account_number: {
        type: Schema.Types.ObjectId,
        ref: 'Account',  // Make sure this matches your Account model name
        required: [true, 'Account number is required'],
        unique: true
    },
    phone_number: {
        type: String,
        required: [true, 'Phone number is required']
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'blocked'],
        default: 'active'
    },
    transaction_pin: {
        type: String,
        required: [true, 'Transaction PIN is required']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;
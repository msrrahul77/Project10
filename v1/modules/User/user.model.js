import mongoose, { Schema } from "mongoose";




const AuditLogSchema = new Schema(
  {
    action: {
      type: String,
      required: [true, "Give me Action Type"],
      enum: {
        values: ["CREATE", "UPDATE", "DELETE", "RESTORE", "STATUS_CHANGE"],
        message: " CREATE, UPDATE, DELETE, RESTORE or STATUS_CHANGE  Must be required !!",
      },
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Not Found"],
    },
    performedByEmail: {
      type: String,
      required: [true, "Give Me Update person Email"],
    },
    ip: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    changes: {
      type: Schema.Types.Mixed, // { field: { old: val, new: val } }
      default: {},
    },
    reason: {
      type: String,
      maxlength: [500, "কারণ ৫০০ অক্ষরের বেশি হতে পারবে না"],
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);


const AddressSchema = new Schema(
  {
    line1: { type: String, maxlength: [200, "ঠিকানার লাইন ১ সর্বোচ্চ ২০০ অক্ষর"] },
    line2: { type: String, maxlength: [200, "ঠিকানার লাইন ২ সর্বোচ্চ ২০০ অক্ষর"] },
    city: { type: String, maxlength: [100, "শহরের নাম সর্বোচ্চ ১০০ অক্ষর"] },
    state: { type: String, maxlength: [100, "রাজ্য/বিভাগ সর্বোচ্চ ১০০ অক্ষর"] },
    postalCode: { type: String, maxlength: [20, "পোস্টাল কোড সর্বোচ্চ ২০ অক্ষর"] },
    country: {
      type: String,
      default: "Bangladesh",
      maxlength: [100, "দেশের নাম সর্বোচ্চ ১০০ অক্ষর"],
    },
  },
  // { _id: false }
);


const UserSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: [true, "টেন্যান্ট আইডি দিতে হবে"],
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "প্রথম নাম দিতে হবে"],
      trim: true,
      minlength: [1, "প্রথম নাম কমপক্ষে ১ অক্ষরের হতে হবে"],
      maxlength: [50, "প্রথম নাম সর্বোচ্চ ৫০ অক্ষর"],
    },
    lastName: {
      type: String,
      required: [true, "শেষ নাম দিতে হবে"],
      trim: true,
      maxlength: [50, "শেষ নাম সর্বোচ্চ ৫০ অক্ষর"],
    },
    email: {
      type: String,
      required: [true, "ইমেইল ঠিকানা দিতে হবে"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "বৈধ ইমেইল ঠিকানা দিতে হবে"],
    },
    phone: {
      type: String,
      match: [/^[+]?[\d\s-]{7,20}$/, "বৈধ ফোন নম্বর দিতে হবে"],
      default: null,
    },
    passwordHash: {
      type: String,
      required: [true, "পাসওয়ার্ড হ্যাশ দিতে হবে"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "ইউজার রোল দিতে হবে"],
      enum: {
        values: [
          "SUPER_ADMIN",
          "DEV_USER",
          "TENANT_ADMIN",
          "MANAGER",
          "ACCOUNTANT",
          "INVENTORY_MANAGER",
          "SALES_REP",
          "CUSTOMER",
          "VIEWER",
        ],
        message:
          "রোল অবশ্যই SUPER_ADMIN, DEV_USER, TENANT_ADMIN, MANAGER, ACCOUNTANT, INVENTORY_MANAGER, SALES_REP, CUSTOMER বা VIEWER হতে হবে",
      },
    },
    userType: {
      type: String,
      enum: {
        values: ["INTERNAL", "SERVICE_CUSTOMER", "PRODUCT_CUSTOMER", "MULTI"],
        message: "ইউজার টাইপ অবশ্যই INTERNAL, SERVICE_CUSTOMER, PRODUCT_CUSTOMER বা MULTI হতে হবে",
      },
      default: "INTERNAL",
    },
    permissions: {
      type: [String],
      default: [],
    },
    avatar: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null, select: false },
    resetPasswordToken: { type: String, default: null, select: false },
    resetPasswordExpires: { type: Date, default: null, select: false },
    lastLogin: { type: Date, default: null },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    address: { type: AddressSchema, default: {} },
    preferences: {
      language: { type: String, default: "bn" },
      theme: {
        type: String,
        enum: { values: ["LIGHT", "DARK", "SYSTEM"], message: "থিম অবশ্যই LIGHT, DARK বা SYSTEM হতে হবে" },
        default: "SYSTEM",
      },
      notifications: { type: Boolean, default: true },
    },
    // ✅ প্রতিটি আপডেটে লগ
    auditLog: [AuditLogSchema],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// compound unique: tenant + email
UserSchema.index({ tenantId: 1, email: 1 }, { unique: true });
UserSchema.index({ role: 1, isActive: 1 });

// Pre-save middleware: আপডেটের সময় auditLog এন্ট্রি
UserSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: new Date() });
});

export const User = mongoose.model("User", UserSchema);


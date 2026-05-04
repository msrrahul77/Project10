import mongoose from "mongoose";
const { Schema } = mongoose;


export const AuditLogSchema = new Schema(
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

/**
 * Address Sub-Schema (shared)
 */
const AddressSchema = new Schema(
  {
    line1: { type: String, maxlength: [200, "ঠিকানার লাইন ১ সর্বোচ্চ ২০০ অক্ষর"] },
    line2: { type: String, maxlength: [200, "ঠিকানার লাইন ২ সর্বোচ্চ ২০০ অক্ষর"] },
    city: { type: String, maxlength: [100, "শহরের নাম সর্বোচ্চ ১০০ অক্ষর"] },
    state: { type: String, maxlength: [100, "রাজ্য/বিভাগ সর্বোচ্চ ১০০ অক্ষর"] },
    postalCode: { type: String, maxlength: [20, "পোস্টাল কোড সর্বোচ্চ ২০ অক্ষর"] },
    country: { type: String, default: "Bangladesh", maxlength: [100, "দেশের নাম সর্বোচ্চ ১০০ অক্ষর"] },
  },
  { _id: false }
);

// ─────────────────────────────────────────────
// 1. TENANT MODEL
// ─────────────────────────────────────────────

const TenantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "টেন্যান্টের নাম দিতে হবে"],
      trim: true,
      minlength: [2, "টেন্যান্টের নাম কমপক্ষে ২ অক্ষরের হতে হবে"],
      maxlength: [150, "টেন্যান্টের নাম সর্বোচ্চ ১৫০ অক্ষর"],
    },
    slug: {
      type: String,
      required: [true, "ইউনিক স্লাগ দিতে হবে"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "স্লাগে শুধু ছোট হাতের অক্ষর, সংখ্যা ও হাইফেন থাকতে পারবে"],
    },
    tenantType: {
      type: String,
      required: [true, "টেন্যান্ট টাইপ দিতে হবে"],
      enum: {
        values: ["SERVICE_PROVIDER", "PRODUCT_PROVIDER", "HYBRID", "ENTERPRISE"],
        message: "টেন্যান্ট টাইপ অবশ্যই SERVICE_PROVIDER, PRODUCT_PROVIDER, HYBRID বা ENTERPRISE হতে হবে",
      },
    },
    plan: {
      type: String,
      enum: {
        values: ["TRIAL", "BASIC", "STANDARD", "PREMIUM", "ENTERPRISE"],
        message: "প্ল্যান অবশ্যই TRIAL, BASIC, STANDARD, PREMIUM বা ENTERPRISE হতে হবে",
      },
      default: "TRIAL",
    },
    domain: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "বৈধ ডোমেইন নাম দিতে হবে"],
      default: null,
    },
    logo: { type: String, default: null },
    contactEmail: {
      type: String,
      required: [true, "যোগাযোগের ইমেইল দিতে হবে"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "বৈধ ইমেইল ঠিকানা দিতে হবে"],
    },
    contactPhone: {
      type: String,
      match: [/^[+]?[\d\s-]{7,20}$/, "বৈধ ফোন নম্বর দিতে হবে"],
      default: null,
    },
    address: { type: AddressSchema, default: {} },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    settings: {
      currency: { type: String, default: "BDT", maxlength: [5, "কারেন্সি কোড সর্বোচ্চ ৫ অক্ষর"] },
      timezone: { type: String, default: "Asia/Dhaka" },
      language: { type: String, default: "bn" },
      taxRate: {
        type: Number,
        min: [0, "ট্যাক্স রেট ০ এর কম হতে পারবে না"],
        max: [100, "ট্যাক্স রেট ১০০ এর বেশি হতে পারবে না"],
        default: 0,
      },
      inventoryMethod: {
        type: String,
        enum: {
          values: ["FIFO", "LIFO", "AVERAGE"],
          message: "ইনভেন্টরি মেথড অবশ্যই FIFO, LIFO বা AVERAGE হতে হবে",
        },
        default: "FIFO",
      },
    },
    auditLog: [AuditLogSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: "tenants",
  }
);

TenantSchema.index({ slug: 1 }, { unique: true });
TenantSchema.index({ isActive: 1, tenantType: 1 });

export const Tenant = mongoose.model("Tenant", TenantSchema);

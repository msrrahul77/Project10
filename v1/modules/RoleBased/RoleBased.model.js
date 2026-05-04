import mongoose, { Schema } from 'mongoose';
import { AuditLogSchema } from "../Tenant/tenant.model.js";

const RolePermissionSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: [true, "টেন্যান্ট আইডি দিতে হবে"],
    },
    roleName: {
      type: String,
      required: [true, "রোলের নাম দিতে হবে"],
      trim: true,
      maxlength: [50, "রোলের নাম সর্বোচ্চ ৫০ অক্ষর"],
    },
    description: {
      type: String,
      maxlength: [300, "বিবরণ সর্বোচ্চ ৩০০ অক্ষর"],
      default: null,
    },
    permissions: {
      type: [
        {
          module: {
            type: String,
            required: [true, "মডিউলের নাম দিতে হবে"],
            enum: {
              values: [
                "INVOICE",
                "PRODUCT",
                "SERVICE",
                "STOCK",
                "ACCOUNT",
                "INVENTORY",
                "USER",
                "TENANT",
                "REPORT",
                "DASHBOARD",
              ],
              message: "মডিউল বৈধ নয়",
            },
          },
          actions: {
            type: [String],
            validate: {
              validator: (arr) => arr.every((a) => ["CREATE", "READ", "UPDATE", "DELETE", "EXPORT"].includes(a)),
              message: "অ্যাকশন অবশ্যই CREATE, READ, UPDATE, DELETE বা EXPORT হতে হবে",
            },
          },
        },
      ],
      default: [],
    },
    isDefault: { type: Boolean, default: false },
    auditLog: [AuditLogSchema],
  },
  {
    timestamps: true,
    collection: "role_permissions",
  }
);

RolePermissionSchema.index({ tenantId: 1, roleName: 1 }, { unique: true });

const RolePermission = mongoose.model("RolePermission", RolePermissionSchema);
export default RolePermission
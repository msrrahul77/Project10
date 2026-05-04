import mongoose from "mongoose";
const { Schema } = mongoose;

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

const Address = mongoose.model("Address", AddressSchema);

export default Address;
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import SearchResultsOverviewBox from "@/components/SearchResultsOverviewBox";

import { PassengerFormData, Passenger } from "@/models"

interface SeatBookingFormProps {
  currentPassengerIndex: number;
  firstPassengerData: Passenger;
  setPassengerName: (name: string) => void;
  formData: PassengerFormData;
  updateFormData: (data: Partial<PassengerFormData>) => void;
}

const SeatBookingForm: React.FC<SeatBookingFormProps> = ({
  currentPassengerIndex,
  firstPassengerData,
  setPassengerName,
  formData,
  updateFormData
}) => {
  useEffect(() => {
    const fullName = `${formData.name} ${formData.last}`;
    setPassengerName(fullName);
  }, [formData.name, formData.last, setPassengerName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: name === "aptNumber" ? Number(value) : value });
  };
  

  const handleCheckboxChange = (checked: boolean) => {
    if (checked && currentPassengerIndex > 0) {
      // Copy data from Passenger 1 if checked 
      updateFormData({
        same_as_passenger: true,
        emerg_name: firstPassengerData.emerg_name || "",
        emerg_last: firstPassengerData.emerg_last || "",
        emerg_email: firstPassengerData.emerg_email || "",
        emerg_phone: firstPassengerData.emerg_phone || ""
      });
    } else {
      // Clear fields if checkbox is unchecked
      updateFormData({
        same_as_passenger: false,
        emerg_name: "",
        emerg_last: "",
        emerg_email: "",
        emerg_phone: ""
      });
    }
  };  

  return (
    <>
      <SearchResultsOverviewBox />
      <div className="flex pt-10" data-testid="booking-form">
        <div className="w-1/6">
          <Avatar className="w-4/5 h-fit">
            <AvatarImage src="/images/avatar.png" alt="Passenger Avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </div>
        <form className="space-y-6 w-5/6">
          {/* Passenger Info */}
          <div className="flex items-start space-x-4">
            <h2 className="text-xl font-semibold text-slate-500">
              Passenger {currentPassengerIndex + 1} (Adult)
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="First name*"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              required
              data-testid="form-field-first-name"
            />
            <Input
              placeholder="Middle name"
              name="middle"
              value={formData.middle || ""}
              onChange={handleInputChange}
              data-testid="form-field-middle-name"
            />
            <Input
              placeholder="Last name*"
              name="last"
              value={formData.last || ""}
              onChange={handleInputChange}
              data-testid="form-field-last-name"
            />
            <Input
              placeholder="Prefix"
              name="prefix"
              value={formData.prefix || ""}
              onChange={handleInputChange}
              data-testid="form-field-prefix"
            />
          </div>

           {/* Date Picker for Date of Birth */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative" data-testid="form-field-calender-button">
                <Input
                  type="text"
                  placeholder="Date of birth*"
                  name="dob"
                  value={formData.dob ? format(new Date(formData.dob), "PPP") : ""}
                  readOnly
                  required
                />
                <CalendarIcon className="absolute right-3 top-3 text-gray-500 h-5 w-5" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={formData.dob ? new Date(formData.dob) : undefined}
                onSelect={(date) => {
                  if (date) {
                    updateFormData({ dob: date });
                  }
                }}
                data-testid="form-field-dob"
              />
            </PopoverContent>
          </Popover>

          {/* Passport and Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Passport number*"
              name="passport_number"
              value={formData.passport_number || ""}
              onChange={handleInputChange}
              data-testid="form-field-passport-number"
            />
            <Input
              placeholder="Known traveller number*"
              name="known_traveller_number"
              value={formData.known_traveller_number || ""}
              onChange={handleInputChange}
              data-testid="form-field-known-traveller-number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email address*"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
               data-testid="form-field-email"
            />
            <Input
              type="tel"
              placeholder="Phone number*"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
               data-testid="form-field-phone"
            />
          </div>

          {/* Address Info */}
          <Input
            placeholder="Street address*"
            name="street_address"
            value={formData.street_address || ""}
            onChange={handleInputChange}
            data-testid="form-field-address"
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Apt Number"
              name="apt_number"
              value={formData.apt_number || ""}
              onChange={handleInputChange}
              data-testid="form-field-apt-number"
            />
            <Input
              placeholder="Province*"
              name="province"
              value={formData.province || ""}
              onChange={handleInputChange}
              data-testid="form-field-province"
            />
            <Input
              placeholder="Zip code*"
              name="zip_code"
              value={formData.zip_code || ""}
              onChange={handleInputChange}
              data-testid="form-field-zip"
            />
          </div>

          {/* Emergency Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mt-4 text-slate-500">
              Emergency contact information
            </h3>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="same_as_passenger"
                checked={Boolean(formData.same_as_passenger)}
                onCheckedChange={(checked) => handleCheckboxChange(checked === true)}
                disabled={currentPassengerIndex === 0}
                data-testid="form-field-checkbox-same-as-first"
              />
              <label htmlFor="same_as_passenger" className="text-slate-400">
                Same as Passenger 1
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First name*"
              name="emerg_name"
              value={formData.emerg_name || ""}
              onChange={handleInputChange}
              data-testid="form-field-emerg-first-name"
            />
            <Input
              placeholder="Last name*"
              name="emerg_last"
              value={formData.emerg_last || ""}
              onChange={handleInputChange}
              data-testid="form-field-emerg-last-name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email address*"
              name="emerg_email"
              value={formData.emerg_email || ""}
              onChange={handleInputChange}
              data-testid="form-field-emerg-email"
            />
            <Input
              type="tel"
              placeholder="Phone number*"
              name="emerg_phone"
              value={formData.emerg_phone || ""}
              onChange={handleInputChange}
              data-testid="form-field-emerg-phone"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SeatBookingForm;

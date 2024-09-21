import { Label } from "@shadcn/ui/label";
import { Input } from "@shadcn/ui/input";
import { TextArea } from "@shadcn/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcn/ui/select";
import { Button } from "../ui/button";

const CommonForm = ({
  formControl,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
            }}
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) => {
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              });
            }}
            value={value}
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <TextArea
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(e) => {
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              });
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 ">
        {formControl.map((formItem) => (
          <div className="grid w-full gap-1.5" key={formItem.name}>
            <Label htmlFor={formItem.name} className="mb-1">
              {formItem.label}
            </Label>
            {renderInputsByComponentType(formItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;

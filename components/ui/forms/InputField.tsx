import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FieldError, UseFormRegister } from "react-hook-form"

type FormInputProps = {
  name: string
  label: string
  placeholder?: string
  type?: string
  register: UseFormRegister<any>
  error?: FieldError
  validation?: object
  disabled?: boolean
  value?: string
}

const InputField = ({ 
  name, 
  label, 
  placeholder, 
  type = "text", 
  register, 
  error, 
  validation = {}, 
  disabled = false, 
  value 
}: FormInputProps) => {
  return (
    <div className="space-y-2">
        <Label htmlFor={name}>
            {label}
        </Label>

        <Input 
            type={type}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
            {...register(name, validation)}
        />

        {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}

export default InputField
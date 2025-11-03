import { FieldError } from "react-hook-form";

export const ErrorMessage = ({error, icon = true, className = ''}: {
    error: FieldError | undefined,
    icon?: boolean,
    className?: string
}) => {
    if (!error) return null;
    
    return (
        <div 
            className={`
            flex items-center gap-3 
            text-red-800 text-sm
            mt-1 px-4 py-1 
            bg-red-25 rounded-lg
            border border-red-100
            shadow-sm
            transition-colors duration-150
            ${className}
        `}
        role="alert"
        >
            {icon && (
                <div className="shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
            <span className="text-red-700">{error.message ?? String(error)}</span>
        </div>
    )
}
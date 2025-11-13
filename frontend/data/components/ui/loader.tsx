import clsx from "clsx"

export const Loader = ({ 
    text = "Загрузка..."
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <div className="w-16 h-16 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin direction-reverse" />
                
                <div className="absolute inset-0 m-auto w-10 h-10 border border-gray-300 border-r-gray-700 rounded-lg animate-spin animation-delay-200" />
                
                <div className="absolute inset-0 m-auto w-6 h-6 bg-linear-to-br from-gray-600 to-gray-800 transform rotate-45 anum animate-spin direction-reverse" />
                
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-caret-blink animation-delay-500" />
            </div>

            <div className="text-center space-y-2">
                <div className="text-sm font-medium text-gray-700 tracking-wider">
                {text}
                </div>
                <div className="flex justify-center space-x-1">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                    key={i}
                    className="w-1 h-1 bg-linear-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
                </div>
            </div>
        </div>
    )
}
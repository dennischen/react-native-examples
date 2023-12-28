import { useRef } from "react"
import { Text } from "react-native"


export default function RerenderCounter({ label }: { label?: string }) {
    const countRef = useRef(0)
    countRef.current = countRef.current + 1

    return <Text>{label ? `${label} ` : ''}{countRef.current}</Text>
}


import { useEffect, useState } from "react"
import { Employees } from "../models/dto/employees_dto"
import { GetSurveyor } from "../api/employees";

export function EmployeeHooks() {
    const [employeeData, setEmployeeData] = useState<Employees[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData : () => Promise<void> = async () => {
            try {
                const employees : Employees[] = await GetSurveyor();
                setEmployeeData(employees); 
            }
            catch (err) {
                setError(err as string)
            }
            finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [])

    return { employeeData, error, loading};
}
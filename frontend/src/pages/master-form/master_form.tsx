import React, { JSX, useEffect, useState } from "react";
import { FormSchema } from "../../models/dto/master_form";
import { GetMasterForm } from "../../api/master_form";
import { Button, Pagination } from "react-bootstrap";
import { ConvertToFormField } from "../../utils/form_field";

type FormValue = string | number | File | boolean | undefined

interface MasterFormProps {
    by : string
}

export function MasterForm(props : MasterFormProps) : JSX.Element {
    const [formData, setFormData] = useState<FormSchema | null>(null);
    const [currPage, setCurrPage] = useState<number>(1);
    const [prevPage, setPrevPage] = useState<number | null>(null);
    const [nextPage, setNextPage] = useState<number | null>(0);
    const [mapForm, setMapForm] = useState(new Map<string, FormValue>());

    useEffect(() => {
        setMapForm(new Map());
    }, [])

    useEffect(() => {
        GetMasterForm(props.by).then((form) => setFormData(form)).catch((err) => console.log(err))
    }, [])

    var temp : number = 0
    const cumulativePrevLength : number[] = []
    
    const handleChange = (key : string, value : any) => {
        const newMap : Map<string, any> = new Map(mapForm);
        newMap.set(key, value)
        console.log(key, value)
        setMapForm(newMap);
    }


    console.log(mapForm);

    formData?.fields.forEach((field, idx) => {
        cumulativePrevLength.push(temp)
        temp += (field.length)
    })
    
    return (
        <div className="form-page" style={{width: '100%'}}>
            <h1 style={{textAlign: 'center', textTransform: 'uppercase'}}>{formData?.title}</h1>
            <div className="form-data" style={{marginTop: '60px'}}>
                <ol start={cumulativePrevLength[currPage-1]+1}>
                    {formData?.fields[currPage-1].map((form, idx) =>
                    <li key={form.label}>
                        <div className={`form-${idx}`} style={{marginBottom: '10px'}}>
                            {ConvertToFormField(form, handleChange, mapForm.get(form.label))}
                        </div>
                    </li>
                    )}
                </ol>
                {currPage === formData?.fields.length? <Button type="submit">Submit</Button> : <></>}
            </div>
            <div className="pagination" style={{display: 'flex', justifyContent: 'center'}}>
                <Pagination>
                    <Pagination.Item active={currPage===1} onClick={() => {
                        setCurrPage(1)
                        setPrevPage(null)
                        setNextPage(2)
                    }}>{1}</Pagination.Item>
                    <Pagination.Item active={currPage===2} onClick={() => {
                        setCurrPage(2)
                        setPrevPage(1)
                        setNextPage(3)
                    }}>{2}</Pagination.Item>
                    <Pagination.Item active={currPage===3} onClick={() => {
                        setCurrPage(3)
                        setPrevPage(2)
                        setNextPage(null)
                    }}>{3}</Pagination.Item>
                </Pagination>
            </div>
        </div>
    )
}
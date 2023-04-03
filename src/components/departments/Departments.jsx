import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import '../../App.css';
import { generateApiUrl } from '../../utils/generateApiUrl';
//import { Button } from '../form/Button'

export function Departments() {
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('empty');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await fetchDepartments();
          }
          fetchData();
    }, []);

    async function fetchDepartments() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl('departments'));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setDepartments(json);
            setState('data');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }


    return (
        <section>
            <h2>Kennsluskrá</h2>
            <DepartmentForm />
            <h3>Listi af deildum</h3>
            {state === 'empty' && (<p>Engar deildir</p>)}
            {state === 'error' && (<p>Villa við að sækja deildir</p>)}
            {state === 'loading' && (<p>Sæki deildir...</p>)}
            <table>
                {state === 'data' && departments.map((department, i) => {
                    return (
                        <>
                            <tr>
                                <td><Link to={`/departments/${department.slug}`} key={i} className="App-link">{department.title}</Link></td>
                            </tr>
                        </>
                    )
                })}
            </table>
            <button className="button" onClick={fetchDepartments}>Uppfæra lista</button>

        </section>
    )
}

export function DepartmentForm() {
    const [state, setState] = useState("empty");
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
  
    async function createDepartment(name, description) {
      setState("loading");
      try {
        const body = {
          title: name,
          description: description
        };
        const response = await fetch(generateApiUrl('departments'), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            const responseJson = await response.json();
            console.log(responseJson);
            setState("error");
            setErrors(responseJson.errors);
          }
        } else {
          setState("success");
        }
      } catch (e) {
        setState("error");
        console.log(e);
      }
    }
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
  
      console.log("nam: ", name);
      console.log("desc: ", description);
  
      createDepartment(name, description);
    };
  
    const onInputChangeName = (e) => {
      setName(e.target.value);
    };

    const onInputChangeDesc = (e) => {
        setDescription(e.target.value);
      };
  
    return (
      <>
        <h3>Búa til nýja deild</h3>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label for="name">Nafn deildar: </label>
            <input id="name" type="text" value={name} onChange={onInputChangeName} />
            <label for="name">  *</label>
          </div>
          <div>
            <label for="description">Um deildina: </label>
            <input id="description" type="text" value={description} onChange={onInputChangeDesc} />
          </div>
  
          <button className="button">Búa til</button>
        </form>
        {state === "empty" && <p></p>}
        {state === "error" && (
          <>
            {" "}
            <p>Villa við að búa til deild</p>
            <p>Villur:</p>
            <ul>
              {errors.map((error, i) => {
                return <li key={i}>{error.msg}</li>;
              })}
            </ul>
          </>
        )}
        {state === "loading" && <p>Bý til deild...</p>}
        {state === "success" && <p>Bjó til deild</p>}
      </>
    );
  }
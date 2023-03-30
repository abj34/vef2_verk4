import { useEffect, useState } from 'react';
import { generateApiUrl } from '../../utils/generateApiUrl';
//import { Button } from '../form/Button'

export function Departments({ title, text }) {
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
            <h2>{title}</h2>
            {state === 'empty' && (<p>Engar deildir</p>)}
            {state === 'error' && (<p>Villa við að sækja deildir</p>)}
            {state === 'loading' && (<p>Sæki deildir...</p>)}
            <ul>
                {state === 'data' && departments.map((department, i) => {
                    return (
                        <li key={i}>{department.title}</li>
                    )
                })}
            </ul>
            <button onClick={fetchDepartments}>Sækja deild</button>
        </section>
    )
}

export function DepartmentForm() {
    const [state, setState] = useState("empty");
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
  
    async function createDepartment(name) {
      setState("loading");
      try {
        const body = {
          title: name,
        };
        const response = await fetch(URL, {
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
          //const json = await response.json();
          setState("sucess");
        }
      } catch (e) {
        setState("error");
        console.log(e);
      }
    }
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
  
      console.log("senda: ", name);
  
      createDepartment(name);
    };
  
    const onInputChange = (e) => {
      setName(e.target.value);
    };
  
    console.log(name);
  
    return (
      <>
        <h2>Ný deild</h2>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label for="name">Nafn: </label>
            <input id="name" type="text" value={name} onChange={onInputChange} />
          </div>
  
          <button>Búa til nýja deild</button>
        </form>
        {state === "empty" && <p>engar deildir</p>}
        {state === "error" && (
          <>
            {" "}
            <p>villa við að búa til deild</p>
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
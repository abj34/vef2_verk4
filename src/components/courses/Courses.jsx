import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateApiUrl } from '../../utils/generateApiUrl';

import '../../App.css';

export function Courses() {
    const { slug } = useParams();
    console.log(slug)
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('empty');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await fetchCourses();
          }
          fetchData();
    }, []);

    async function fetchCourses() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`/departments/${slug}/courses`));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setCourses(json);
            setState('data');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }


    return (
        <section>
            <h2>????</h2>
            {state === 'empty' && (<p>Engir áfangar</p>)}
            {state === 'error' && (<p>Villa við að sækja áfanga</p>)}
            {state === 'loading' && (<p>Sæki áfanga...</p>)}
            <ul>
                {state === 'data' && courses.map((course, i) => {
                    return (
                        <>
                        <li><Link to={course.courseId} key={i} className="App-link">{course.title}</Link></li>
                        </>
                    )
                })}
            </ul>
            <Link to={`/departments/${slug}`}>Til baka</Link>

            <button onClick={fetchCourses}>Sækja áfanga</button>
        </section>
    )
}


export function CourseForm() {
    const { slug } = useParams();

    const [state, setState] = useState("empty");
    const [errors, setErrors] = useState([]);

    const [courseId, setCourseId] = useState("");
    const [name, setName] = useState("");
    const [units, setUnits] = useState("");
    const [semester, setSemester] = useState("");
    const [level, setLevel] = useState("");
    const [url, setUrl] = useState("");
  
    async function createCourse(courseId, name, units, semester, level, url) {
      setState("loading");
      try {
        const body = {
          courseId: courseId,
          title: name,
          units: units,
          semester: semester,
          level: level,
          url: url
        };
        const response = await fetch(generateApiUrl(`/departments/${slug}/courses`), {
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
  
      console.log("senda: ", courseId, name, units, semester, level, url);
  
      createCourse(courseId, name, units, semester, level, url);
    };
  
    const onInputChangeCourseId = (e) => {
      setCourseId(e.target.value);
    };

    const onInputChangeName = (e) => {
      setName(e.target.value);
    };

    const onInputChangeUnits = (e) => {
      setUnits(e.target.value);
    };

    const onInputChangeSemester = (e) => {
      setSemester(e.target.value);
    };

    const onInputChangeLevel = (e) => {
      setLevel(e.target.value);
    };

    const onInputChangeUrl = (e) => {
      setUrl(e.target.value);
    };
  
    return (
      <>
        <h2>Búa til nýjan áfanga</h2>
        <form onSubmit={onSubmitHandler}>
        <div>
            <label for="courseId">Áfanganúmer: </label>
            <input id="courseId" type="text" value={courseId} onChange={onInputChangeCourseId} />
            <label for="courseId">  *</label>
          </div>
          <div>
            <label for="name">Nafn áfanga: </label>
            <input id="name" type="text" value={name} onChange={onInputChangeName} />
            <label for="name">  *</label>
          </div>
          <div>
            <label for="units">Einingar: </label>
            <input id="units" type="number" value={units} onChange={onInputChangeUnits} />
            <label for="units">  *</label>
          </div>
          <div>
            <label for="semester">Önn: </label>
            <input id="semester" type="text" value={semester} onChange={onInputChangeSemester} />
            <label for="semester">  *</label>
          </div>
          <div>
            <label for="level">Námsleið: </label>
            <input id="level" type="text" value={level} onChange={onInputChangeLevel} />
          </div>
          <div>
            <label for="url">Hlekkur að áfanga: </label>
            <input id="url" type="text" value={url} onChange={onInputChangeUrl} />
          </div>
  
          <button>Búa til</button>
      </form>
        {state === "empty" && <p></p>}
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
// import React, { useState } from "react";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
import { FormControl, FormCheck } from "react-bootstrap";
import { useState } from "react";
// 5.2.3.4 On Your Own

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
      });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const [module, setModule] = useState({
        id: "mod-123",
        name: "React Components",
        description: "Learn how to build reusable UI components",
        course: "CS4550",
      });
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <FormControl className="w-75" id="wd-module-name"
        defaultValue={module.name} onChange={(m) =>
          setModule({ ...module, name: m.target.value })}/>
      <hr />
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
        <a id="wd-retrieve-modules" className="btn btn-primary"
             href={`${REMOTE_SERVER}/lab5/module`}>
            Get Module
        </a><hr/>

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
        <a id="wd-retrieve-module-name" className="btn btn-primary"
             href={`${REMOTE_SERVER}/lab5/module/name`}>
            Get Module Name
        </a><hr/>
        <h4 className="mt-4">Modifying Score & Completed</h4>
      <FormControl type="number" value={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: Number(e.target.value) })}
        />
      <a className="btn btn-primary mt-2 me-2"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <FormCheck type="checkbox" label="Completed?" checked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
      />
      <a className="btn btn-primary mt-2"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
    </div>
);}

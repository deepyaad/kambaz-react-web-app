import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as courseClient from "../client";
import * as modulesClient from "./client";




export default function Modules() {

    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();

    const fetchModulesForCourse = async () => {
        const modules = await courseClient.findModulesForCourse(cid!);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModulesForCourse();
    }, [cid]);

    /*
    const saveModule = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };

    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };
    */

    const createModuleForCourse = async () => {
        if (!cid) return;
        const newModule = { name: moduleName, course: cid };
        const module = await courseClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
    };

    const deleteModuleHandler = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    const updateModuleHandler = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };



    const fetchModules = async () => {
        const modules = await courseClient.findModulesForCourse(cid!);

        dispatch(setModules(modules));
    };

    useEffect(() => {
        fetchModules();
    }, []);


    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    

    
    
    return (
        <div>
            {isFaculty && 
            (
                <ModulesControls 
                    setModuleName={setModuleName} moduleName={moduleName}    
                    addModule={createModuleForCourse}/>
            )}
            
            <br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules.map((module: any) => (
                    <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {!module.editing && module.name}
                            { module.editing && isFaculty && (
                                <FormControl className="w-50 d-inline-block"
                                    onChange={(e) => updateModuleHandler({ ...module, name: e.target.value }) }

                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                         updateModuleHandler({ ...module, editing: false });

                                        }
                                    }}
                                    defaultValue={module.name}/>
                            )}
                            {isFaculty && (
                                <ModuleControlButtons
                                    moduleId={module._id}  
                                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                                    deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                                />
                            )} 
                            
                        </div>
                        {module.lessons && (
                        <ul className="wd-lessons list-group rounded-0">
                            {module.lessons.map((lesson: any) => (
                            <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                                {isFaculty && <LessonControlButtons />}
                            </li>
                            ))}
                        </ul>)}
                    </li>))
                }
            </ul>
      </div>      
    );
}
    
    
/*
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs'
import { useParams } from "react-router";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

// import { add } from "../../../Labs/Lab3/Math";
// import * as db from "../../Database";
// import { v4 as uuidv4 } from "uuid";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    
    return (
        <div>
            <ModulesControls 
                moduleName={moduleName} 
                setModuleName={setModuleName}
                addModule={() => {
                    dispatch(addModule({ name: moduleName, course: cid }));
                    setModuleName("");
                }} 
            />
            <br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules.filter((module: any) => module.course === cid).map((module: any) => (
                    <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" /> {module.name}
                            {!module.editing && module.name}
                            { module.editing && (
                                <input className="form-control w-50 d-inline-block"
                                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            dispatch(updateModule({ ...module, editing: false }));}}}
                                    defaultValue={module.name}
                                />
                            )} 
                            <ModuleControlButtons moduleId={module._id}
                                deleteModule={(moduleId) => {dispatch(deleteModule(moduleId));}}
                                editModule={(moduleId) => dispatch(editModule(moduleId))} 
                            />   
                        </div>
                        {module.lessons && (
                        <ul className="wd-lessons list-group rounded-0">
                            {module.lessons.map((lesson: any) => (
                            <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                                <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                            </li>
                            ))}
                        </ul>)}
                    </li>))
                }
            </ul>
      </div>      
    );
}
    */
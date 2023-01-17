/**
 * How the API is currently written...
 * /api/classes - returns all classes stored in every department in data folder
 * /api/classes/[department] = when given department in CAPS, returns all classes stored in said department
 * /api/classes/[department]/[class_num] - when given department in CAPS and course num, returns said class stored in said department.
 */

import {amth} from "../../../data/amth";
import {coen} from "../../../data/coen";
import {chem} from "../../../data/chem";
import {elen} from "../../../data/elen";
import {engl} from "../../../data/engl";
import {engr} from "../../../data/engr";
import {math} from "../../../data/math";
import {phys} from "../../../data/phys";

export default function handler(req, res) {

    const data = req.query.data;
    const dept = data[0];
    let cnum = "";
    if (data.length === 2) {
        cnum = data[1];
    }
    console.log(data.length);
    if (dept === "") {
        res.status(404).send("Not found");
        return;
    }

    switch (dept) {
        case "AMTH":
            setStatus(amth, res, cnum);
            break;
        case "COEN":
            setStatus(coen, res, cnum);
            break;
        case "CHEM":
            setStatus(chem, res, cnum);
            break;
        case "ELEN":
            setStatus(elen, res, cnum);
            break;
        case "ENGL":
            setStatus(engl, res, cnum);
            break;
        case "ENGR":
            setStatus(engr, res, cnum);
            break;
        case "MATH":
            setStatus(math, res, cnum);
            break;
        case "PHYS":
            setStatus(phys, res, cnum);
            break;
        default:
            res.status(404).send("Not found");
            break;

    }
}

function setStatus(deptID, res, cnum) {
    if (cnum === "") {
        res.status(200).json(deptID);
    } else {
        for (let i = 0; i < deptID.length; i++) {
            if (cnum === deptID[i]["Class Number"]) {
                res.status(200).json(deptID[i]);
            }
        }
    }
}


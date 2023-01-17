import { amth } from "../../../data/amth";
import { coen } from "../../../data/coen";
import { elen } from "../../../data/elen";
import { engl } from "../../../data/engl";
import { engr } from "../../../data/engr";
import { math } from "../../../data/math";
import { phys } from "../../../data/phys";

export default function handler(req, res) {
    let allClasses = amth.concat(coen, elen, engl, engr, math, phys);
    res.status(200).json(allClasses);
}
export const manhattanDistance = `/**
* Manhattan distance
* 
* current: { x: number; y: number; index: number }
* goal: { x: number; y: number; index: number }
* 
* return number
*/
function heuristic(current, goal){
 const dx = Math.abs(current.x - goal.x);
 const dy = Math.abs(current.y - goal.y);

 return dx + dy;
}
`;

export const euclideanDistance = `/**
* Euclidean distance
* 
* current: { x: number; y: number; index: number }
* goal: { x: number; y: number; index: number }
* 
* return number
*/
function heuristic(current, goal){
 const dx = Math.abs(current.x - goal.x);
 const dy = Math.abs(current.y - goal.y);

 return (dx ** 2 + dy ** 2) ** 0.5;
}
`;

export const chebyshevDistance = `/**
* Chebyshev distance
* 
* current: { x: number; y: number; index: number }
* goal: { x: number; y: number; index: number }
* 
* return number
*/
function heuristic(current, goal){
 const dx = Math.abs(current.x - goal.x);
 const dy = Math.abs(current.y - goal.y);

 return Math.max(dx, dy);
}
`;

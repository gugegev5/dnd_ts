export interface Todo {
  title: string;
  title2: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  title2: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, keyof Todo2>;
const a: TodoPreview = {
  title: "t",
};
class C {
  x = 0;
  y = 0;
}

type T1 = InstanceType<typeof C>; // C
const c = new C();
type T2 = typeof c;
type T3 = typeof C;
type T4 = keyof Object;
const t1: T1 = { x: 1, y: 1 };
const t2: T2 = { x: 0, y: 0 };

type T0 = Exclude<"a" | "b" | "c", "a">;

enum Kind {
  square = "square",
  rectangle = "rectangle",
  circle = "circle",
}


type a = Exclude<keyof typeof Kind, typeof Kind.square>
const b: a = Kind.square;

enum test {
  A = 1,
  B = 2,
}


type d = Exclude<keyof typeof test, 'AA'>

interface Rectangle {
  // kind: Omit<keyof typeof Kind, Kind.circle>;
  kind: keyof typeof Kind;
  name: string;
  width: number;
  height: number;
}
// interface Circle {
//   kind: Kind.circle;
//   radius: number;
// }
type Shape =
  | Rectangle
  | {
      kind: Kind.circle;
      name: string;
      radius: number;
    };
function area(s: Shape) {
  if (s.kind === Kind.rectangle) {
    s.height;
    // case "square": return s.size * s.size;
    // case "rectangle": return s.height * s.width;
    // case "circle": return Math.PI * s.radius ** 2;
  }
}

function p(s: Kind) {
  if (s === Kind.rectangle) {
  }
}

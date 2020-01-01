import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

class SpaceObject {
  public readonly name: string;
  private readonly parent: SpaceObject | undefined;
  private children: SpaceObject[] = [];

  constructor(name: string, parent?: SpaceObject | undefined) {
    this.name = name;
    this.parent = parent;
  }

  public addChild(name: string): SpaceObject {
    const child: SpaceObject = new SpaceObject(name, this);
    this.children.push(child);
    return child;
  }

  public getParentNode(): SpaceObject | undefined {
    return this.parent;
  }

  public getNodeByName(name: string): SpaceObject | null {
    let child = null;
    if (this.name === name) {
      return this;
    } else {
      this.children.forEach((node: SpaceObject) => {
        if (node.getNodeByName(name)) {
          child = node.getNodeByName(name);
        }
      });

      return child;
    }
  }

  public getDistanceToNode(name: string): number {
    let distance: number = 0;
    if (this.name === name) {
      distance = 0;
    } else {
      this.children.forEach((node: SpaceObject) => {
        if (node.getNodeByName(name)) {
          distance = node.getDistanceToNode(name) + 1;
        }
      });
    }
    return distance;
  }

  public countOrbits(): number {
    if (this.parent) {
      return 1 + this.parent.countOrbits();
    }

    return 0;
  }

  public getAllOrbits(): number {
    return this.countOrbits() + R.sum(R.map(R.invoker(1, 'getAllOrbits')(null, R.__), this.children));
  }
}

// tslint:disable-next-line:max-classes-per-file
export class Solution {
  private rootNode: SpaceObject = new SpaceObject('COM');
  private userNode!: SpaceObject;
  private santaNode!: SpaceObject;

  constructor(input: any) {
    const cache: any = {COM: this.rootNode};
    let allPaths: string[] = input.toString().split('\n');
    while (allPaths.length > 0) {
      allPaths = allPaths.map((orbitPath: string) => {
        const [nodeName, childName] = orbitPath.split(')');
        const node: SpaceObject | null = cache[nodeName] || null;
        if (node) {
          cache[childName] = node.addChild(childName);
          return '';
        } else {
          return orbitPath;
        }
      }).filter((path: string) => path.length > 0);
    }
    this.userNode = cache.YOU;
    this.santaNode = cache.SAN;
  }

  public processPart1(): number {
    return this.rootNode.getAllOrbits();
  }

  public processPart2(): number {
    let steps: number = 0;
    const pathToSanta: string[] = [];
    let tempNode: SpaceObject = this.santaNode;
    while ((tempNode.getParentNode() as any).name !== 'COM') {
      tempNode = tempNode.getParentNode() as any;
      if (!tempNode) {
        throw Error('Can\'t find parent node');
      }
      pathToSanta.push(tempNode.name);
    }
    if (!this.userNode.getNodeByName('SAN')) {
      let parentNode: SpaceObject | undefined = this.userNode.getParentNode();
      if (!parentNode) {
        throw Error(`Can't find parent node`);
      }
      while (!pathToSanta.includes(parentNode.name)) {
        parentNode = parentNode.getParentNode();
        steps++;
        if (!parentNode) {
          throw Error(`Can't find parent node`);
        }
      }
      return steps + pathToSanta.indexOf(parentNode.name);
    } else {
      return this.userNode.getDistanceToNode('SAN') - 1;
    }
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);
  console.log(`The total number of direct and indirect orbits ${chalk.yellow(solution.processPart1().toString())}`);
  console.log(`The minimum number of orbital transfers is ${chalk.yellow(solution.processPart2().toString())}`);
}

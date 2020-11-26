import { ColliderComponent } from "./components/colliderComponent"
import { Component } from "./components/component"
import { Rectangle } from "./components/rectangle"

 
export class Vec2 {
    x: number
    y: number

    constructor (x: number, y: number) {
      this.x = x
      this.y = y
    }
  }
/*
  export class AABB {
    position: Vec2
    heigth : number
    width : number
    
    constructor (position: Vec2, width: number, heigth: number) {
      this.position = position
      this.width = width
      this.heigth = heigth
    }
    
    overlapsVec (vec: Vec2): boolean {
      return this.position.x - this.width <= vec.x && vec.x <= this.position.x + this.width
          && this.position.y - this.heigth <= vec.y && vec.y <= this.position.y + this.heigth
    }
    
    overlapsAABB (aabb: AABB): boolean {
      return !(
           aabb.position.x - aabb.width > this.position.x + this.heigth
        || aabb.position.x + aabb.width < this.position.x - this.heigth
        || aabb.position.y - aabb.width > this.position.y + this.heigth
        || aabb.position.y + aabb.width < this.position.y - this.heigth
      )
    }
  }
  */
  export class QuadTree {
    static MaxElements = 1
    static MaxDepth = 3
    
    bounds: Rectangle
    
    depth: number
    
    divided: boolean;
    
    components : ColliderComponent[]
    northWest!: QuadTree
    northEast!: QuadTree
    southWest!: QuadTree
    southEast!: QuadTree
    
    constructor (bounds: Rectangle, depth: number = 0) {
      this.bounds = bounds
      this.depth = depth
      this.divided = false
      this.components = [ ]
    }
    
    insert (component : ColliderComponent): boolean {
      if (!this.bounds.intersectsWith(component.area)) {
        return false
      } else if (this.depth == QuadTree.MaxDepth || (!this.divided && this.components.length < QuadTree.MaxElements)) {
        this.components.push(component)
        return true
      } else {
        if (!this.divided) this.divide()
        
        return this.northWest.insert(component)
            || this.northEast.insert(component)
            || this.southWest.insert(component)
            || this.southEast.insert(component)
      }
    }
    
    divide () {
      const hw = (this.bounds.xMax-this.bounds.xMin) / 2
      const hh =  (this.bounds.yMax-this.bounds.yMin) / 2
      
      this.northWest = new QuadTree(new Rectangle({xMin:this.bounds.xMin, yMin:this.bounds.yMin ,xMax:this.bounds.xMin + hw,yMax:this.bounds.yMin + hh}), this.depth + 1)
      this.northEast = new QuadTree(new Rectangle({xMin:this.bounds.xMin + hw, yMin:this.bounds.yMin ,xMax:this.bounds.xMax,yMax:this.bounds.yMin + hh}), this.depth + 1)
      this.southWest = new QuadTree(new Rectangle({xMin:this.bounds.xMin, yMin:this.bounds.yMin + hh,xMax:this.bounds.xMin + hw,yMax: this.bounds.yMax}), this.depth + 1)
      this.southEast = new QuadTree(new Rectangle({xMin:this.bounds.xMin + hw, yMin:this.bounds.yMin + hh,xMax:this.bounds.xMax,yMax: this.bounds.yMax}), this.depth + 1)
       
      while (this.components.length > 0) {
        let comp = this.components.pop()
        if (comp != undefined) {
          this.northWest.insert(comp)
          || this.northEast.insert(comp)
          || this.southWest.insert(comp)
          || this.southEast.insert(comp)
        }
      }

      this.components = [ ]
      this.divided = true
    }
    
    getCollisions (): Array<[ColliderComponent, ColliderComponent]> {
      const collisions: Array<[ColliderComponent, ColliderComponent]> = [];
      const pile: QuadTree[] = [ ];
      pile.push(this);
      while (pile.length > 0) {
        const quadtree = pile.pop();
        if (this.northWest != null) {
          pile.push(this.northWest);
          pile.push(this.northEast);
          pile.push(this.southWest);
          pile.push(this.southEast);          
        }
        else {
          for (let i = 0; i < this.components.length; i++) {
            const c1 = this.components[i];
            if (!c1.enabled || !c1.owner.active) {
              continue;
            }

            for (let j = i + 1; j < this.components.length; j++) {
              const c2 = this.components[j];
              if (!c2.enabled || !c2.owner.active) {
                continue;
              }
      
              if (c1.mask & c2.flag && c1.area.intersectsWith(c2.area)) {
                collisions.push([c1, c2]);
              }
            }
          }
        }
      }
      return collisions;
    }
    
    query (area: Rectangle, out: ColliderComponent[][] = []): ColliderComponent[][] {
      if (!this.bounds.intersectsWith(area)) {
        return out
      } else {
        if (!this.divided) {
          out.push([]);
          for (const component of this.components) {
            if (area.intersectsWith(component.area)) out[out.length - 1].push(component)
          }

        } else {
          this.northWest.query(area, out)
          this.northEast.query(area, out)
          this.southWest.query(area, out)
          this.southEast.query(area, out)
        }
        
        return out
      }
    }

    // ## Fonction draw
    // affichage de debug
    // les valeurs ajouter sur les position permettre de recentrer pour l'affichage sur le canvas
    draw(ctx: CanvasRenderingContext2D, offset: Vec2){
      if(this.divided){
          this.northWest.draw(ctx, offset);
          this.northEast.draw(ctx, offset);
          this.southWest.draw(ctx, offset);
          this.southEast.draw(ctx, offset);

      }else{
          ctx.beginPath();
          ctx.strokeRect(this.bounds.xMin + offset.x, this.bounds.yMin + offset.y, this.bounds.xMax - this.bounds.xMin, this.bounds.yMax - this.bounds.yMin);
          ctx.closePath();
          this.components.forEach(element => {
            let Positions = new Vec2(element.area.xMin,element.area.yMin)
            let size = new Vec2 (element.area.xMax - element.area.xMin,element.area.yMax - element.area.yMin);
              ctx.fillRect(Positions.x + offset.x, Positions.y + offset.y, size.x,size.y);
          });
      }
  }
  }
  
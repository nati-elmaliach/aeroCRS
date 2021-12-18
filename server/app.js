// Declare constants
const PIXEL_DIMMENSION = "1px";
const NEW_GENES_OPTIONS = ["inherit", "random"]
let pixelsPopulation = undefined;

// helper functions
function log(logString) {
  console.log("---------------")
  console.log(logString)
  console.log("---------------")

}


function getRandomRGB({ single }) {
  let min = 0;
  let max = 255;

  if (single) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return {
    R: Math.floor(Math.random() * (max - min + 1) + min),
    G: Math.floor(Math.random() * (max - min + 1) + min),
    B: Math.floor(Math.random() * (max - min + 1) + min)
  }
}

function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}


class Pixel {

  constructor(genes) {
    this.genes = genes;
    this.width = PIXEL_DIMMENSION;
    this.height = PIXEL_DIMMENSION;
  }

  getSingleGene(geneName) {
    return this.genes[geneName]
  }

  async save() {
    const response = await fetch("http://localhost:5001/api/pixel",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          genes: this.genes
        })
      });
    return response
  }


  static async createWithRandomGenes() {
    let genes = getRandomRGB({ single: false })
    return await Pixel.create(genes)
  }

  static async create(genes) {
    const p = new Pixel(genes)
    await p.save()
    const { R, G, B } = p.genes
    log(`Created new pixel -> R: ${R} , G:${G} , B:${B}`)
    return p
  }
}

class PixelPopulation {

  constructor() {
    this.population = []
  }

  async createTwoFirstPixels() {
    const firstPixel = await Pixel.createWithRandomGenes()
    const secondPixel = await Pixel.createWithRandomGenes()
    this.population.push(firstPixel, secondPixel)
  }

  getGeneByName(geneName, parents) {
    const geneMethod = getRandomElementFromArray(NEW_GENES_OPTIONS)
    if (geneMethod === "random") {
      log(`${geneName} is random`)
      return getRandomRGB({ single: true })
    } else {
      log(`${geneName} is inherited`)
      const parent = getRandomElementFromArray(parents)
      return parent.getSingleGene(geneName)
    }
  }

  getPixelParents() {
    const halfSize = Math.ceil(this.population.length / 2);
    const AOptions = this.population.slice(0, halfSize)
    const BOptions = this.population.slice(halfSize)
    return {
      A: getRandomElementFromArray(AOptions),
      B: getRandomElementFromArray(BOptions)
    }

  }

  async createNewPixel() {
    const { A, B } = this.getPixelParents();
    const parents = [A, B];
    const genes = {
      R: this.getGeneByName("R", parents),
      G: this.getGeneByName("G", parents),
      B: this.getGeneByName("B", parents)

    }
    const newPixel = await Pixel.create(genes)
    this.population.push(newPixel)
  }
}



// Program entery point
async function init() {
  log("Initializing - creating the first 2 pixels, new pixels will be created every 5 sec.")
  const pixelPopulation = new PixelPopulation();
  await pixelPopulation.createTwoFirstPixels()
  setInterval(async () => {
    await pixelPopulation.createNewPixel()
    log(`New pixel population size is -> ${pixelPopulation.population.length}`)
  }, 5000)
}
import { dest, src } from "gulp"
import path from "path"
import { program } from "commander"
import { execSync } from "child_process"
import fs from "fs"

program.option("-e, --environment <envname>")
program.parse()

const options = program.opts()

const paths = {
  environement: (envname: string) =>
    path.join(__dirname, "devops", "environment", envname),
  sharedComponents: path.join(__dirname, "packages", "shared-components"),
  // backOffice: path.join(__dirname, "packages", "back-office"),
  frontOffice: path.join(__dirname, "packages", "front-office"),
  backend: path.join(__dirname, "packages", "backend"),
}

function theme(name: string) {
  console.log("Switching theme to", name)
  // Move tailwind in shared components
  src(path.join(paths.environement(name), "tailwind.config.js"))
    .pipe(dest(paths.sharedComponents))
    // .pipe(dest(paths.backOffice))
    .pipe(dest(paths.frontOffice))
}

function merge2Files(srcFile: string, destFile: string) {
  console.log("Merging", srcFile, "into", destFile)
  if (fs.existsSync(destFile)) {
    execSync(
      `echo "$(sort -u -t '=' -k 1,1 ${srcFile} ${destFile} | grep -v '^$\|^\s*\#')" > ${destFile}`
    )
  } else {
    execSync(`cp ${srcFile} ${destFile}`)
  }
}

function rules(name: string) {
  console.log("Injecting rules for", name)
  merge2Files(
    path.join(paths.environement(name), "front-office", "config.env"),
    path.join(paths.frontOffice, ".env")
  )
  // merge2Files(
  //   path.join(paths.environement(name), 'back-office', 'config.env'),
  //   path.join(paths.backOffice, '.env'),
  // );
  merge2Files(
    path.join(paths.environement(name), "backend", "config.env"),
    path.join(paths.backend, ".env")
  )
}

function ressources(name: string) {
  console.log("Injecting ressources for", name)

  console.log("Copying shared-components ressources...")
  src(
    path.join(paths.environement(name), "shared-components", "public", "**")
  ).pipe(dest(path.join(paths.sharedComponents, "public")))

  console.log("Copying front-office ressources...")
  src(path.join(paths.environement(name), "front-office", "public", "**")).pipe(
    dest(path.join(paths.frontOffice, "public"))
  )

  // console.log("Copying back-office ressources...")
  // src(path.join(paths.environement(name), "back-office", "public", "**")).pipe(
  //   dest(path.join(paths.backOffice, "public"))
  // )
}

function switchEnvironment(cb: () => void) {
  console.log("Switching environment to", options.environment)
  theme(options.environment)
  rules(options.environment)
  ressources(options.environment)
  cb()
}

exports.switchEnvironment = switchEnvironment

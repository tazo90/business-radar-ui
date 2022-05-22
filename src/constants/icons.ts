import all from "@assets/all.png";

// AmRest
// =================
// Markers
import amrestMarker from "@assets/amrest/markers/amrest.png";
import bcaMarker from "@assets/amrest/markers/bca.png";
import bfMarker from "@assets/amrest/markers/bf.png";
import bkMarker from "@assets/amrest/markers/bk.png";
import kabbMarker from "@assets/amrest/markers/kabb.png";
import kfcMarker from "@assets/amrest/markers/kfc.png";
import phMarker from "@assets/amrest/markers/ph.png";
import sbxMarker from "@assets/amrest/markers/sbx.png";
import ssgMarker from "@assets/amrest/markers/ssg.png";
import tagMarker from "@assets/amrest/markers/tag.png";
// Brands
import kfc from "@assets/amrest/brands/kfc.png";
import ph from "@assets/amrest/brands/ph.png";
import bk from "@assets/amrest/brands/bk.png";
import sbx from "@assets/amrest/brands/sbx.png";
import tag from "@assets/amrest/brands/tag.png";
import bf from "@assets/amrest/brands/bf.png";
import kabb from "@assets/amrest/brands/kabb.png";
import bca from "@assets/amrest/brands/bca.png";
import ssg from "@assets/amrest/brands/ssg.png";

const amrest = {
  markers: {
    amrest: amrestMarker,
    bca: bcaMarker,
    bf: bfMarker,
    bk: bkMarker,
    kabb: kabbMarker,
    kfc: kfcMarker,
    ph: phMarker,
    sbx: sbxMarker,
    ssg: ssgMarker,
    tag: tagMarker,
  },
  brands: {
    kfc,
    ph,
    bk,
    sbx,
    tag,
    bf,
    kabb,
    bca,
    ssg,
  },
};

// TODO: rafactor it to countries
// Flags
import pl from "@assets/flags/pl.svg";
import cz from "@assets/flags/cz.svg";
import hu from "@assets/flags/hu.svg";
import sk from "@assets/flags/sk.svg";
import bg from "@assets/flags/bg.svg";
import de from "@assets/flags/de.svg";
import es from "@assets/flags/es.svg";
import ro from "@assets/flags/ro.svg";
import ru from "@assets/flags/ru.svg";
import rs from "@assets/flags/rs.svg";
import cn from "@assets/flags/cn.svg";
import fr from "@assets/flags/fr.svg";
import hr from "@assets/flags/hr.svg";
import at from "@assets/flags/at.svg";
import pt from "@assets/flags/pt.svg";
import si from "@assets/flags/si.svg";

import star from "@assets/icons/star.png";
import jobs from "@assets/icons/jobs.png";
import users from "@assets/icons/users.png";
import training from "@assets/icons/training.png";
import closed from "@assets/icons/closed.png";

const flags = {
  all,
  pl,
  cz,
  hu,
  sk,
  bg,
  de,
  es,
  ro,
  ru,
  rs,
  cn,
  fr,
  hr,
  at,
  pt,
  si,
};

const icons = {
  star,
  jobs,
  users,
  training,
  closed,
};

export default {
  amrest,
  flags,
  icons,
};

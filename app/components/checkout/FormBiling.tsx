import { useGetKecamatan } from "@/services/shipping/useGetKecamatan";
import { useGetProvince } from "@/services/shipping/useGetProvince";
import { useFormCheckout } from "@/services/useFormCheckout";
import { useGetCity } from "@/services/useGetCity";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import { ModalDelivery } from "./ModalDelivery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "@/store/hook";
import { useMutateFormCheckout } from "@/services/useMutateFormCheckout";

type ProvinceType = {
  id: number;
  name: string;
};

type CityType = {
  id: number;
  name: string;
};

type KecamatanType = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  size: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const FormBiling = () => {
  const [provinceId, setProvinceId] = useState<number | "">("");
  const [nameProvince, setNameProvince] = useState<string | null>(null);
  const [nameCity, setNameCity] = useState<string | null>(null);
  const [cityId, setCityId] = useState<number | "">("");
  const [kecamatanId, setKecamatanId] = useState<number | "">("");
  const [kecamatanName, setKecamatanName] = useState<string | undefined>();
  const { data: province, isFetching: loadingProvince } = useGetProvince();

  const { data: city, isFetching: loadingCity } = useGetCity(
    provinceId === "" ? undefined : provinceId,
  );

  // data delivery
  const delivery = useAppSelector((state) => state.deliverySelected.selected);

  const kurir = delivery?.name;
  const estimasi = delivery?.etd;
  const ongkir = delivery?.cost;

  const { data: kecamatan, isPending: loadingKecamatan } = useGetKecamatan(
    cityId == "" ? undefined : cityId,
  );

  const { mutate, data, isPending: mutatePending } = useMutateFormCheckout();

  const formik = useFormCheckout({ kurir, estimasi, ongkir, mutate });

  function handleProvinceChange(e: SelectChangeEvent<number | "">) {
    setProvinceId(e.target.value as number);
    const selectedNameProvince = province.find(
      (p: ProvinceType) => p.id == (e.target.value as number),
    );

    formik.setFieldValue("province", selectedNameProvince.name);
    // formik.setFieldValue("city", "");

    setNameProvince(selectedNameProvince.name);
    setCityId(""); // kota lama harus di-reset karena provinsinya berubah
  }

  const handleCityForm = (e: SelectChangeEvent<number | "">) => {
    setCityId(e.target.value as number);

    const nameCitySelected = city.find(
      (p: CityType) => p.id === (e.target.value as number),
    );

    formik.setFieldValue("city", nameCitySelected.name);

    setNameCity(nameCitySelected.name);
  };

  const handleKecamatanForm = (e: SelectChangeEvent<number | "">) => {
    setKecamatanId(e.target.value as number);
    const kecamatanNameSelected = kecamatan?.find(
      (p: KecamatanType) => p.id === (e.target.value as number),
    );

    formik.setFieldValue("kecamatan", kecamatanNameSelected?.name);
    setKecamatanName(kecamatanNameSelected?.name);
  };

  const items: Product[] = JSON.parse(
    sessionStorage.getItem("checkoutItems") || "[]",
  );

  const totalWeight = items.reduce((sum, item) => sum + item.quantity * 500, 0);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-1">
            <TextField
              label="phone"
              name="phone"
              value={formik.values.phone}
              required
              aria-readonly
              variant="outlined"
              onChange={formik.handleChange}
              className="w-full"
            />

            {formik.touched.phone && formik.errors.phone && (
              <small className="text-red-500">{formik.errors.phone}</small>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <TextField
              label="address"
              variant="outlined"
              required
              aria-readonly
              name="point"
              value={formik.values.point}
              onChange={formik.handleChange}
              className="w-full"
            />
            {formik.touched.point && formik.errors.point && (
              <small className="text-red-500">{formik.errors.point}</small>
            )}
          </div>
          <FormControl fullWidth>
            <InputLabel>Province</InputLabel>
            <Select
              name="province"
              // onChange={formik.handleChange}
              value={provinceId}
              onChange={handleProvinceChange}
              className="mt-2"
              // value={formik.values.province} // Ensure value is never undefined
              displayEmpty>
              {loadingProvince && (
                <MenuItem disabled>Loading provinces...</MenuItem>
              )}
              {province && province.length > 0 ? (
                province.map((items: ProvinceType, i: number) => (
                  <MenuItem key={i} value={items.id}>
                    {items.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading provinces...</MenuItem>
              )}
            </Select>
            {formik.touched.province && formik.errors.province && (
              <small className="text-red-500 text-sm">
                {formik.errors.province}
              </small>
            )}
          </FormControl>
          <FormControl fullWidth className="mt-2" disabled={provinceId === ""}>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              label="City"
              name="city"
              value={cityId}
              className="mt-2"
              onChange={handleCityForm}>
              {loadingCity && <MenuItem disabled>Loading cities...</MenuItem>}
              {!loadingCity &&
                city?.map((c: CityType) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="mt-2" disabled={cityId === ""}>
            <InputLabel id="kecamatan-label">Kecamatan</InputLabel>
            <Select
              labelId="kecamatan-label"
              label="kecamatan"
              name="kecamatan"
              value={kecamatanId}
              className="mt-2"
              onChange={handleKecamatanForm}>
              {loadingCity && <MenuItem disabled>Loading Kecamatan</MenuItem>}
              {!loadingCity &&
                kecamatan?.map((c: CityType) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
            </Select>
            {formik.touched.kecamatan && formik.errors.kecamatan && (
              <small>{formik.errors.kecamatan}</small>
            )}
          </FormControl>
          <ModalDelivery kecamatanId={kecamatanId} totalWeight={totalWeight} />
        </div>

        <button
          type="submit"
          disabled={mutatePending}
          className="btn mt-4 btn-primary w-full rounded-lg">
          Checkout
        </button>
      </form>
    </>
  );
};

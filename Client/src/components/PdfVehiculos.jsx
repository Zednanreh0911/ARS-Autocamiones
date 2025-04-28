import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  PDFViewer,
  View,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

PdfVehiculos.propTypes = {
  title: PropTypes.string.isRequired,
  elementos: PropTypes.arrayOf(
    PropTypes.shape({
      marca: PropTypes.string.isRequired,
      modelo: PropTypes.string.isRequired,
      combustible: PropTypes.string.isRequired,
      año: PropTypes.number.isRequired,
      transmision: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function PdfVehiculos({ title, elementos }) {
  const styles = StyleSheet.create({
    page: {
      position: "relative",
      padding: 20, // Padding general para toda la página
    },
    contentContainer: {
      // El padding ahora está en la página
    },
    titleContainer: {
      marginBottom: 20, // Espacio entre el título y la tabla
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: 4,
      fontSize: 12,
      fontWeight: "bold",
    },
    tableCell: {
      margin: 4,
      fontSize: 10,
    },
    watermarkContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.15,
      zIndex: -1,
    },
    watermarkText: {
      fontSize: 60,
      color: "gray",
      transform: "rotate(-45deg)",
    },
    watermarkImage: {
      width: 300,
      height: 100,
    },
  });
  const watermarkImageSource = "/logoArs.png"; // URL del logo

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        {Array.from({ length: Math.ceil(elementos.length / 30) }).map(
          (_, pageNumber) => (
            <Page key={`page_${pageNumber}`} size="A4" style={styles.page}>
              <View style={styles.contentContainer}>
                {pageNumber === 0 && (
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Reportes de {title}</Text>
                  </View>
                )}
                {pageNumber === 0 && (
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Marca</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Modelo</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Combustible</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Año</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Transmisión</Text>
                      </View>
                    </View>
                  </View>
                )}

                {elementos
                  .slice(pageNumber * 30, (pageNumber + 1) * 30)
                  .map((vehiculo, index) => (
                    <View style={styles.table} key={index}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{vehiculo.marca}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {vehiculo.modelo}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {vehiculo.combustible}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{vehiculo.año}</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {vehiculo.transmision}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>

              {/* Marca de agua */}
              <View style={styles.watermarkContainer}>
                {watermarkImageSource && (
                  <Image
                    style={styles.watermarkImage}
                    src={watermarkImageSource}
                  />
                )}
              </View>
            </Page>
          )
        )}
      </Document>
    </PDFViewer>
  );
}

export default PdfVehiculos;

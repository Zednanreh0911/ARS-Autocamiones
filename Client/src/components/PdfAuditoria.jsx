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

PdfAuditoria.propTypes = {
  title: PropTypes.string.isRequired,
  elementos: PropTypes.arrayOf(
    PropTypes.shape({
      fecha: PropTypes.string.isRequired,
      usuario: PropTypes.string.isRequired,
      accion: PropTypes.string.isRequired,
      entidad: PropTypes.string.isRequired,
    })
  ).isRequired,
};

import { useEffect, useState } from "react";

function PdfAuditoria({ title, elementos: initialElementos }) {
  const [elementos, setElementos] = useState(initialElementos);

  // Permitir recibir datos por postMessage si se abre en nueva ventana
  useEffect(() => {
    const handler = (event) => {
      if (
        event.origin === window.location.origin &&
        event.data &&
        event.data.type === "PDF_AUDITORIA_DATA"
      ) {
        setElementos(event.data.elementos || []);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  const styles = StyleSheet.create({
    page: {
      position: "relative",
      padding: 20,
    },
    contentContainer: {},
    titleContainer: {
      marginBottom: 20,
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
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "25%",
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
    watermarkImage: {
      width: 300,
      height: 100,
    },
  });
  const watermarkImageSource = "/logoArs.png";

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
                        <Text style={styles.tableCellHeader}>Fecha</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Usuario</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Acción</Text>
                      </View>
                      <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>
                          Entidad afectada
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {elementos
                  .slice(pageNumber * 30, (pageNumber + 1) * 30)
                  .map((auditoria, index) => (
                    <View style={styles.table} key={index}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {auditoria.fecha}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {auditoria.usuario}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {auditoria.accion}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {auditoria.entidad}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
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

export default PdfAuditoria;

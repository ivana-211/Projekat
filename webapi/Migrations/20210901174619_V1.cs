using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vezbanje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vezbanje", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Dani",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    NedeljaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dani", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Dani_Vezbanje_NedeljaID",
                        column: x => x.NedeljaID,
                        principalTable: "Vezbanje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vezbe",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Workout = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Boja = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DanID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vezbe", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vezbe_Dani_DanID",
                        column: x => x.DanID,
                        principalTable: "Dani",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dani_NedeljaID",
                table: "Dani",
                column: "NedeljaID");

            migrationBuilder.CreateIndex(
                name: "IX_Vezbe_DanID",
                table: "Vezbe",
                column: "DanID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vezbe");

            migrationBuilder.DropTable(
                name: "Dani");

            migrationBuilder.DropTable(
                name: "Vezbanje");
        }
    }
}
